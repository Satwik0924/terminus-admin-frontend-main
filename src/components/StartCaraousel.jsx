import React, { useEffect, useRef, useState } from "react";

const CHANGE_IMAGE_INTERVAL = 6 * 1000;

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

  const [currentIndex, setCurrentIndex] = useState(Math.floor((images.length - 1) / 2)); // Default to middle image
  const [fade, setFade] = useState(false);
  const [carouselCursor, setCarouselCursor] = useState("default");
  const intervalRef = useRef(null);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(goToNext, CHANGE_IMAGE_INTERVAL);
  };

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
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      setFade(false);
    }, 1000); // Fade duration
  };

  // Automatically change images every 6 seconds
  useEffect(() => {
    resetInterval(); // Start the interval on component mount
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  const handleNavigation = (isNext) => {
    if (isNext) {
      goToNext();
    } else {
      goToPrev();
    }
    resetInterval(); // Reset the interval whenever a user navigates manually
  };

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
    setCarouselCursor(isRightHalf ? "carousel-next" : "carousel-prev");
  };

  return (
    <div
      onMouseMove={handleMousePointer}
      onMouseLeave={() => setCarouselCursor("default")}
      className={`w-full h-[800px] relative overflow-hidden rounded-lg ${carouselCursor === "carousel-next" ? "cursor-next" : carouselCursor === "carousel-prev" ? "cursor-prev" : ""}`}
      onClick={(e) => handleNavigation(e.clientX > e.currentTarget.offsetWidth / 2)}
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
