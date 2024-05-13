import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo/shubham-farms.png";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Navbar: React.FC = () => {
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        setAuthToken(authToken || "");
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
        setUser(userData.user.name);
        setUserName(userData.user.name);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const UserName = userName
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();
  const handleCropChange = (event: any) => {
    const selectedOption = event.target.value;
    navigate(`/Crops/${selectedOption}`);
  };


  return (
    <>
      <div className="sticky h-auto w-full top-0 z-50">
        <div className="container mx-auto bg-gray-200 px-8 relative z-50">
          <div className="flex justify-between items-center">
            <div className="logo">
              <Link to={"/"}>
                <img src={logo} alt="Shubham Farm" width={100} />
              </Link>
            </div>
            <div
              className={`nav-items ${
                isMobileMenuOpen ? "md:hidden" : "hidden md:block"
              }`}
            >
              <ul
                className={`flex items-center gap-6 cursor-pointer text-lg ${
                  isMobileMenuOpen ? "flex-col" : "hidden md:flex"
                }`}
              >
                <li>
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      `hover:text-gray-600 ${isActive ? "font-medium" : ""}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/About"}
                    className={({ isActive }) =>
                      `hover:text-gray-600 ${isActive ? "font-medium" : ""}`
                    }
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <select
                    className="bg-gray-700 cursor-pointer text-white px-3 py-1 rounded focus:outline-none focus:ring focus:border-blue-300"
                    onChange={handleCropChange}
                  >
                    <option value="">Crops</option>
                    <option value="onion">Onion</option>
                    <option value="sugarcane">Sugarcane</option>
                    <option value="potato">Potato</option>
                    <option value="tomato">Tomato</option>
                  </select>
                </li>
                <li>
                  <NavLink
                    to={"/Gallery"}
                    className={({ isActive }) =>
                      `hover:text-gray-600 ${isActive ? "font-medium" : ""}`
                    }
                  >
                    Gallery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/Contact"}
                    className={({ isActive }) =>
                      `hover:text-gray-600 ${isActive ? "font-medium" : ""}`
                    }
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <div>
                    <select className="bg-gray-700 cursor-pointer text-white px-3 py-1 rounded focus:outline-none focus:ring focus:border-blue-300">
                      <option value="en" className="toggleBtn">
                        English
                      </option>
                      <option value="mr" className="toggleBtn">
                        Marathi
                      </option>
                    </select>
                  </div>
                </li>
                <li>
                  {authToken && authToken.length !== 0 ? (
                    <Link
                      to={`/Profile/${user}`}
                      title="View Profile"
                      className="font-bold bg-slate-800 text-teal-50 rounded-[50%] py-2 px-3 cursor-pointer"
                    >
                      {UserName}
                    </Link>
                  ) : (
                    <Link to={"/Register"} className="hover:text-gray-600">
                      Registration
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
