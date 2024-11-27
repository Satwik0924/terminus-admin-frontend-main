import React, { useState, useEffect } from "react";

const Carousel = () => {
  const images = [
    "https://th.bing.com/th/id/OIP.K_QqOOtJJiUtFeGU9IjX8gHaE8?w=208&h=139&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.w9lFQGzKhUkbou-H0YqXBgAAAA?w=208&h=272&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.fI8GFMq9G3gj_tpF9_UxygHaKW?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.CHfxdB3yfEavHWUpVl0EdAHaFD?w=208&h=142&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.UMI42HuYAMyKGXQEG7vwBQHaJQ?w=208&h=260&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.mn4EXbmz7bbjTYdH97Ly5wAAAA?w=208&h=277&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.w9lFQGzKhUkbou-H0YqXBgAAAA?w=208&h=272&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  ];

  const [currentIndex, setCurrentIndex] = useState(2); // Default to middle image
  const [fade, setFade] = useState(false);

  const goToNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(false);
    }, 1000); // Fade duration
  };

  const goToPrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(false);
    }, 1000); // Fade duration
  };

  // Automatically change images every 6 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  const handleMousePointer = (e) => {
    const carousel = e.currentTarget;
    const image = carousel.querySelector("img");

    // Get the bounding rectangle of the image
    const imageRect = image.getBoundingClientRect();

    // Calculate mouse position relative to the image
    const mouseX = e.clientX - imageRect.left;

    // Detect if the mouse is on the left or right side of the image
    const isRightHalf = mouseX > imageRect.width / 2;

    // Set cursor to '<' for left side and '>' for right side '>' for right side
    carousel.style.cursor = isRightHalf
    
    ? "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%200%20100%20100%22><text x=%2250%25%22 y=%2250%25%22 font-size=%2290%22 text-anchor=%22middle%22 dy=%22.35em%22>%3E</text></svg>') 16 16, pointer"
    : "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%200%20100%20100%22><text x=%2250%25%22 y=%2250%25%22 font-size=%2290%22 text-anchor=%22middle%22 dy=%22.35em%22>&lt;</text></svg>') 16 16, pointer";
  

  };

  return (
    <div
      style={{
        width: "1000px",
        height: "600px",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
      }}
      onMouseMove={handleMousePointer}
      onClick={(e) =>
        e.clientX > e.currentTarget.offsetWidth / 2 ? goToNext() : goToPrev()
      }
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: fade ? 0 : 1,
          transition: "opacity 1.5s ease-in-out",
        }}
      />
    </div>
  );
};

export default Carousel;
