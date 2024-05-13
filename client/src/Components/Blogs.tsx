import { useEffect, useState } from 'react';
import { BiHeart } from 'react-icons/bi';

interface Blog {
  _id: string;
  title: string;
  date: Date;
  plantationDate: Date;
  pesticide: string;
  photo: { name: string };
  description: string;
  likes: string[];
  comments: string[];
  user: {
    id: string;
    name: string
  }
}

function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/blogs', {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const { blogsData }: { blogsData: Blog[] } = await response.json();
      // console.log(blogsData);

      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLike = async (blogId: string) => {
    try {
      let authToken = localStorage.getItem("authToken")
      const token = authToken || ""
      const encodedToken = encodeURIComponent(token); // Encode the token

      const response = await fetch(`http://localhost:4000/blogs/${blogId}/like`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${encodedToken}` // Include the encoded token in the Authorization header
        }
      });

      if (!response.ok) {
        throw new Error('Failed to like the blog post');
      }

      // Refresh blogs after liking
      fetchBlogs();
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  // const handleComment = async (blogId: string, comment: string, userId: string) => {
  //   try {

  //     let authToken = localStorage.getItem("authToken")
  //     const token = authToken || ""
  //     const encodedToken = encodeURIComponent(token); // Encode the token
  //     // Prepare the request body
  //     const requestBody = {
  //       comment: comment,
  //       userId: userId
  //     };

  //     // Send a POST request to add the comment
  //     const response = await fetch(`http://localhost:4000/blogs/${blogId}/comments`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         "Authorization": `Bearer ${encodedToken}`
  //       },
  //       body: JSON.stringify(requestBody), // Convert the request body to JSON format
  //     });

  //     // Check if the request was successful
  //     if (!response.ok) {
  //       throw new Error('Failed to add comment');
  //     }

  //     // Refresh blogs after commenting
  //     fetchBlogs();
  //   } catch (error) {
  //     console.error('Error adding comment:', error);
  //   }
  // };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-4xl font-bold text-center mb-8">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.slice().reverse().map((blog: Blog) => (
          <div key={blog._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="overflow-hidden rounded-lg">
              <img
                src={`http://localhost:4000/uploads/${blog.photo.name}`}
                alt={blog.title}
                className="w-full h-40 object-cover mb-4 rounded-lg hover:scale-105 transform transition duration-300"
              />
            </div>
            <h2 className='text-xl font-bold mb-2 text-center'>{blog.user ? blog.user.name : "Unknown User"} Blog</h2>
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-gray-500">{new Date(blog.date).toDateString()}</p>
              <div className="flex items-center space-x-4">
                <button onClick={() => handleLike(blog._id)} className="flex items-center text-gray-500 focus:outline-none">
                  <BiHeart className="text-2xl" /> {blog.likes.length}   Likes
                </button>
                {/* <button onClick={() => handleComment(blog._id, "Your comment", blog.user.id)} className="flex items-center text-gray-500 focus:outline-none">
                  {blog.comments.length}{' '}
                  {blog.comments.length === 1 ? 'comment' : 'comments'}
                </button> */}
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Blogs;
