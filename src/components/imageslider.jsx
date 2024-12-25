import React, { useState } from "react";

const ImageSlider = () => {
  const images = [
    {
      src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-4c92c200-0b12-4881-9dca-0d54008841f0.jpg?e=webp&cX=21&cY=219&cW=497&cH=730",
      link: "https://example.com/your-link1",
    },
    {
      src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-4c92c200-0b12-4881-9dca-0d54008841f0.jpg?e=webp&cX=21&cY=219&cW=497&cH=730",
      link: "https://example.com/your-link2",
    },
    {
      src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-4c92c200-0b12-4881-9dca-0d54008841f0.jpg?e=webp&cX=21&cY=219&cW=497&cH=730",
      link: "#",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full mb-7">
      {/* Image Slider */}
      <div className="relative">
        <a href={images[currentIndex].link}>
          <img
            src={images[currentIndex].src}
            alt={`Image ${currentIndex + 1}`}
            className="w-full transition-transform duration-100 h-[75vh] object-cover object-top"
          />
        </a>
      </div>

      {/* Left Arrow */}
      <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 ">
        <svg className="w-10 h-9" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="white">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
        <svg className="w-10 h-8" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="white">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ImageSlider;
