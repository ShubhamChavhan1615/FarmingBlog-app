import React, { useState, useEffect } from 'react';

const Slider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const images = [
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhcm1pbmd8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhcm1pbmd8ZW58MHx8MHx8fDA%3D",
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleNextSlide();
        }, 3000);

        return () => clearInterval(intervalId);
    }, [currentSlide]);

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    };

    return (
        <div className="relative w-full h-[400px] shadow-lg my-2 overflow-hidden rounded-lg">
            <img
                src={images[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between">
                <button
                    className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-12 bg-opacity-50 text-white text-3xl font-extrabold hover:bg-opacity-70 focus:outline-none z-10"
                    onClick={handlePrevSlide}
                >
                    &lt;    
                </button>
                <button
                    className="absolute top-0 bottom-0 right-0 flex items-center justify-center w-12 bg-opacity-50 text-white text-3xl font-extrabold hover:bg-opacity-70 focus:outline-none z-10"
                    onClick={handleNextSlide}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default Slider;
