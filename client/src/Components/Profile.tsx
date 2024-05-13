import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import UsersPosts from "./UsersPosts";

function Profile() {
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState("")
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const token = authToken || "";
        const encodedToken = encodeURIComponent(token);

        const response = await fetch(`http://localhost:4000/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${encodedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await response.json();
        setUser(userData.user);
        setUserName(userData.user.name); // Update to set the userName with the user's name
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const UserName = userName
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase()) // Capitalize first letter of each part
    .join("");

  const logout = () => {
    localStorage.removeItem("authToken");
  }

  return (
    <div className="flex justify-center items-center w-full flex-col h-auto absolute">
      <div className="w-full md:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-lg p-8 relative top-6 mb-3">
        {user && (
          <>
            <div className="flex items-center w-auto mb-6">
              <Link to={"/"}>
                <FaArrowLeft className="cursor-pointer relative right-4 bottom-8" title="back" />
              </Link>
              <div className="bg-slate-700 rounded-full p-4 mr-4">
                <h1 className="font-bold text-3xl text-white">{UserName}</h1>
              </div>
              <div>
                <h1 className="text-xl font-semibold">{user.name}</h1>
                <p className="text-gray-500">Posts: {user.blogs.length || 0}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <Link
                to={`/editProfile/${user.name}`}
                className="bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-900 transition-colors duration-300"
              >
                Edit Profile
              </Link>
              <Link
                to={`/profile/${user.name}/postBlogs`}
                className="bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-900 transition-colors duration-300"
              >
                Post Blog
              </Link>
              <Link to={"/"} onClick={logout} className="bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-900 transition-colors duration-300">Log Out</Link>
            </div>
          </>
        )}
      </div>
      <UsersPosts />
    </div>
  );
}

export default Profile;
