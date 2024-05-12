import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import registerModel from "../models/register.js";
import { connectDB } from "../db/db.js";
import cors from "cors";
import { jwtAuthMiddleware } from "../middleware/jwtAuthenticate.js";
import blogModel from "../models/blogs.js";
import contactModel from "../models/contact.js";
import multer from "multer";
import path from "path";
import cookieParser from "cookie-parser";


// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store files in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
}); // Store files in memory
const upload = multer({ storage: storage });

const router = express.Router();

const corsOptions = {
    origin: true,
    credentials: true,// Allow sending cookies from the client
};

router.use(cors(corsOptions));
router.use(cookieParser());
// Function to generate JWT token
function generateToken(user) {
    const payload = {
        user: {
            id: user.id
        }
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

//for ejs pages
router.get("/register", (req, res) => {
    res.render("register")
})

router.get("/", (req, res) => {
    res.render("register")
})

// Route to register a new user
router.post('/register/home', async (req, res) => {
    try {
        // Extract user details from request body
        const { name, mobile, address, pincode, password } = req.body;

        // Check if all required fields are provided
        if (!name || !mobile || !address || !pincode || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({ msg: "Password should be at least 6 characters" });
        }

        // Check if the user already exists
        const existingUser = await registerModel.findOne({ mobile: mobile });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new registerModel({
            name,
            mobile,
            address,
            pincode,
            password: hashedPassword
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = generateToken(newUser);

        // Set token as a cookie
        res.cookie("token", token, { httpOnly: true }).json({ msg: "User registered successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

//signin for ejs
router.get("/signin", (req, res) => {
    res.render("signin")
})

// Route to signin a user
router.post("/signin/home", async (req, res) => {
    try {
        const { mobile, password } = req.body;

        // Simple validation
        if (!mobile || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        // Find user by mobile number
        const user = await registerModel.findOne({ mobile: mobile });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);

        // Check password match
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Set token as a cookie
        res.cookie("token", token, { httpOnly: true }).json({ msg: "Signin successful", token });

    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

//for post a blog
//for ejs page
router.get("/postBlogs", (req, res) => {
    res.render("blogs")
})

// // POST route to create a new blog post
// perfect code working
router.post("/blogs", jwtAuthMiddleware, upload.single('photo'), async (req, res) => {
    try {
        const userId = req.user.id;
        // console.log(userId);
        const user = await registerModel.findById(userId)
        // Extract data from request body
        const { title, plantationDate, pesticide, description, likes, comments } = req.body;
        const date = new Date();
        // Get the file data and name from the request
        const photoName = req.file.originalname;

        // Create a new blog post document using the model
        const newBlog = new blogModel({
            title,
            date,
            plantationDate,
            pesticide,
            photo: { name: photoName },
            description,
            likes,
            comments,
            user: userId
        });

        // Save the new blog post to the database
        await newBlog.save();
        await user.blogs.push(newBlog._id);
        await user.save();
        // Respond with a success message
        res.status(201).json({ message: "Blog post created successfully", blog: newBlog });
    } catch (error) {
        // If there's an error, respond with an error message
        res.status(500).json({ error: error.message });
    }
});

//perfect code
// // GET route to fetch and show all stored blogs
// router.get("/blogs", async (req, res) => {
//     try {
//         // Fetch all blogs from the database
//         const blogsData = await blogModel.find();
//         const userId = await blogsData.user
//         const user = await registerModel.findById(userId)
//         // Check if there are any blogs
//         if (blogsData.length === 0) {
//             return res.status(404).render('error', { message: "No blogs found" });
//         }

//         // Render the blogs using an EJS template
//         // res.render('showBlogs', { blogs:blogsData });
//         res.status(200).json({ blogsData, user:user })
//     } catch (error) {
//         // If there's an error, render an error page
//         res.status(500).render('error', { error: error.message });
//     }
// });
//try an err
router.get("/blogs", async (req, res) => {
    try {
        // Fetch all blogs from the database
        const blogsData = await blogModel.find();

        // Fetch user for each blog
        const blogsWithUsers = await Promise.all(blogsData.map(async (blog) => {
            const user = await registerModel.findById(blog.user);
            return { ...blog.toJSON(), user }; // Merge user data with blog data
        }));

        // Check if there are any blogs
        if (blogsData.length === 0) {
            return res.status(404).render('error', { message: "No blogs found" });
        }

        // Render the blogs using an EJS template
        // res.render('showBlogs', { blogs: blogsWithUsers });
        res.status(200).json({ blogsData: blogsWithUsers });
    } catch (error) {
        // If there's an error, render an error page
        res.status(500).render('error', { error: error.message });
    }
});

//route  for likes a blog
router.post('/blogs/:blogId/like', jwtAuthMiddleware, async (req, res) => {
    try {
        // Access user ID from the request object
        const userId = req.user.id;
        const { blogId } = req.params;

        // Find the blog by ID
        const blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the user has already liked the blog
        const userIndex = blog.likes.indexOf(userId);
        if (userIndex !== -1) {
            // If user already liked, remove their like
            blog.likes.splice(userIndex, 1);
            await blog.save();
            return res.status(200).json({ message: 'Blog like removed successfully' });
        }

        // Add the user ID to the likes array
        blog.likes.push(userId);
        await blog.save();

        res.status(200).json({ message: 'Blog liked successfully' });
    } catch (error) {
        console.error('Error liking blog:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get user using jwtToken
router.get("/user/profile", jwtAuthMiddleware, async (req, res) => {
    try {
        // Access user ID from the request object
        const userId = req.user.id;
        const user = await registerModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ msg: "Server Error" });
    }
});

//route to get user posted blogs 
router.get("/user/profile/postedBlogs", jwtAuthMiddleware, async (req, res) => {
    try {
        // Access user ID from the request object
        const userId = req.user.id;
        const blog = await blogModel.find();
        const usersPostedBlogs = blog.filter((b, i) => {
            if (b.user[0] == userId) {
                return b
            }
        })
        res.json({ usersPostedBlogs })
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
})

//route to save contact-us details
router.post("/contact", async (req, res) => {
  try {
    const { name, phoneNumber, email, company, subject, question } = req.body; // Remove await from req.body

    const contactSave = new contactModel({
      name,
      phoneNumber,
      email,
      company,
      subject,
      question,
    });

    await contactSave.save();
    res.status(200).json({ msg: "data saved" });
  } catch (error) {
    console.error("Error saving contact details:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});

//route for delete a blogs
router.get("/blog/delete/:id", jwtAuthMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        // Delete the blog
        const blog = await blogModel.findByIdAndDelete(id);

        // Find the user
        const userBlog = await registerModel.findById(userId);

        // Find the index of the blog ID in the user's blogs array
        const blogIndex = userBlog.blogs.indexOf(id);

        // If the blog ID is found in the array, remove it
        if (blogIndex !== -1) {
            userBlog.blogs.splice(blogIndex, 1); // Remove 1 element starting from the blogIndex
            await userBlog.save();
            // console.log("Blog removed from user's blogs array");
        }

        res.status(200).json({ msg: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ msg: "Server Error" });
    }
});

// Update user profile route
router.put("/profile/edit/:id", jwtAuthMiddleware, async (req, res) => {
    const userId = req.user.id; // Get user ID from JWT payload
    const { id } = req.params; // Get the user ID from the request parameters
    const userDataToUpdate = req.body; // Get updated user data from the request body

    try {
        // Check if the user ID from JWT matches the ID from the request parameters
        if (userId !== id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        // Update the user data
        const updatedUser = await registerModel.findByIdAndUpdate(id, userDataToUpdate, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send the updated user data as response
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get blog using id 
router.get("/blog/:id", async (req, res)=>{
    try {
        const blogId = req.params.id;
        const blog = await blogModel.findById(blogId)
        if (!blog) {
            res.status(400).json({msg: "blog not found"})
        }
        else {
            res.status(200).json({blogData:blog})
        }
    } catch (error) {
        res.status(500).json({msg: "server error"})
    }
})

// Update blogs route
router.put("/blog/edit/:id", jwtAuthMiddleware, async (req, res)=>{
    try {
        const { id } = req.params;
        const updatedData = req.body; // Assuming the client sends the updated blog data in the request body

        // Find the blog by ID and update it
        const updatedBlog = await blogModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route for adding a comment to a blog post
// router.post("/blogs/:blogId/comments", jwtAuthMiddleware, async (req, res) => {
//     try {
//         // Access user ID from the request object
//         const userId = req.user.id;
//         const { blogId } = req.params;
//         const { comment } = req.body;
//         // Find the blog post by its ID
//         const blog = await blogModel.findById(blogId);
//         if (!blog) {
//             return res.status(404).json({ error: "Blog not found" });
//         }
//         // Add the comment to the blog post
//         blog.comments.push(comment, userId);
//         // Save the updated blog post
//         await blog.save();
//         res.json(blog);
//     } catch (error) {
//         console.error("Error adding comment:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });
router.post("/blogs/:blogId/comments", jwtAuthMiddleware, async (req, res) => {
    try {
        // Access user ID from the request object
        const userId = req.user.id;
        const { blogId } = req.params;
        const { comment } = req.body;

        // Find the blog post by its ID
        const blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Add the comment object to the blog post
        blog.comments.push({ comment, userId });

        // Save the updated blog post
        await blog.save();
        res.json(blog);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
