import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Home from './Pages/Home.tsx';
import About from './Pages/About.tsx';
import Contact from './Pages/Contact.tsx';
import Gallery from './Pages/Gallery.tsx';
import Register from './Components/Register.tsx';
import SignIn from './Components/SignIn.tsx';
import Blogs from './Pages/Blogs.tsx';
import PostsBlogs from './Components/PostsBlogs.tsx';
import Profile from './Components/Profile.tsx';
import UsersPosts from './Components/UsersPosts.tsx';
import EditProfile from './Components/EditProfile.tsx';
import EditBlog from './Components/EditBlog.tsx';
import Crops from './Components/Crops.tsx';
import PageNotFound from './Components/PageNotFound.tsx';
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "About",
      element: <About />
    },
    {
      path: "Gallery",
      element: <Gallery />
    },
    {
      path: "Contact",
      element: <Contact />
    },
    {
      path: "Register",
      element: <Register />
    },
    {
      path: "SignIn",
      element: <SignIn />
    },
    {
      path: "Blogs",
      element: <Blogs />
    },
    {
      path: "/profile/:user/postBlogs",
      element: <PostsBlogs />
    },
    {
      path: "Profile/:name",
      element: <Profile />
    },
    {
      path: "profile/:user/posts",
      element: <UsersPosts />
    },
    {
      path:"/editProfile/:user",
      element:<EditProfile/>
    },
    {
      path:"/EditBlog/:id",
      element:<EditBlog/>
    },
    {
      path:"/Crops/:name",
      element:<Crops/>
    },
    {
      path:"*",
      element:<PageNotFound/>
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
