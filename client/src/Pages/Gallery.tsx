// import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function Gallery() {
  let imgData = [
    {
      src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      src: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    // Add more image objects as needed
  ];

  return (
    <>
      <Navbar />
      <div className="gallery text-center w-full py-2 text-3xl">
        <h1 className="font-bold">Our Farms Gallery</h1>
      </div>
      <div className="container mx-auto py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden">
        {imgData.map((item, index) => (
          <img key={index} src={item.src} width={390} height={400} alt="farmImg" className="rounded-lg shadow-md hover:scale-105 transform transition duration-300" />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Gallery;
