import { useEffect, useState } from "react"
import { AiOutlineClose, AiOutlineMore } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
        name: string
    }
}

function UsersPosts() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [showDeleteEdit, setShowDeleteEdit] = useState<{[key: string]: boolean}>({});

    const handleDelete = async (id: string) => {
        try {
            const authToken = localStorage.getItem("authToken");
            const token = authToken || "";
            const encodedToken = encodeURIComponent(token);

            const response = await fetch(`http://localhost:4000/blog/delete/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${encodedToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete blog post");
            }
            toast.success("Blog deleted successfully", { autoClose: 3000 })
            // Update state after successful deletion
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
        } catch (error) {
            console.error("Error Deleting user blog:", error);
        }
    }

    useEffect(() => {
        const fetchUsersBlogs = async () => {
            try {
                const authToken = localStorage.getItem("authToken");
                const token = authToken || "";
                const encodedToken = encodeURIComponent(token);

                const response = await fetch(`http://localhost:4000/user/profile/postedBlogs`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${encodedToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }
                const { usersPostedBlogs }: { usersPostedBlogs: Blog[] } = await response.json();
                setBlogs(usersPostedBlogs);

            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUsersBlogs();
    }, []);

    const toggleDeleteEdit = (id: string) => {
        setShowDeleteEdit(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }

    const handleDeleteIconClick = (id: string) => {
        setShowDeleteEdit(prevState => ({
            ...prevState,
            [id]: false // Close delete/edit options for this specific blog post
        }));
    }

    return (
        <div className="container mx-auto py-6">
            <ToastContainer/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog: Blog) => (
                    <div key={blog._id} className="bg-white rounded-lg shadow-md p-6 relative">
                        {showDeleteEdit[blog._id] ? (
                            <AiOutlineClose onClick={() => handleDeleteIconClick(blog._id)} className="absolute top-2 right-2 text-2xl font-extrabold cursor-pointer" />
                        ) : (
                            <AiOutlineMore onClick={() => toggleDeleteEdit(blog._id)} className="absolute top-2 right-2 text-2xl font-extrabold cursor-pointer" />
                        )}
                        <div className="overflow-hidden rounded-lg">
                            <img
                                src={`http://localhost:4000/uploads/${blog.photo.name}`}
                                alt={blog.title}
                                className="w-full h-40 object-cover mb-4 rounded-lg hover:scale-105 transform transition duration-300"
                            />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                        <p className="text-gray-600 mb-4">{blog.description}</p>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500">{new Date(blog.date).toDateString()}</p>
                            <div className="flex items-center space-x-4">
                                <button className="flex items-center text-gray-500 focus:outline-none">
                                    {blog.likes.length}   Likes
                                </button>
                                <button className="flex items-center text-gray-500 focus:outline-none">
                                    {blog.comments.length}{' '}
                                    {blog.comments.length === 1 ? 'comment' : 'comments'}
                                </button>
                            </div>
                        </div>
                        {showDeleteEdit[blog._id] && (
                            <div className="flex flex-col bg-slate-200 rounded w-[120px] text-center absolute top-14 right-2">
                                <button onClick={() => handleDelete(blog._id)} className="shadow-md font-semibold text-[red] cursor-pointer">Delete Blog</button>
                                 <Link to={`/EditBlog/${blog._id}`} className="rounded-xl mt-2 font-semibold text-[green] cursor-pointer">Edit Blog</Link>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersPosts;
