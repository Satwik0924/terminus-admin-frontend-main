import { useEffect, useRef, useState } from "react";

const CHANGE_IMAGE_INTERVAL = 6 * 1000;

const Carousel = () => {
  // Fetch images from the public/assets directory with the naming convention "Artboard 1.png", "Artboard 2.png", etc.
  const images = Array.from({ length: 6 }, (_, i) => `/assets/Artboard ${i + 1}.png`);

  const [currentIndex, setCurrentIndex] = useState(Math.floor((images.length - 1) / 2)); // Default to middle image
  const [fade, setFade] = useState(false);
  const [carouselCursor, setCarouselCursor] = useState("default");
  const intervalRef = useRef(null);

  const scrollToProjects = () => {
    const projects = document.getElementById("explore-projects");
    if (projects) projects.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

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
      className={`w-full sm:h-[120dvh] h-[400px] relative overflow-hidden  ${
        carouselCursor === "carousel-next" ? "cursor-next" : carouselCursor === "carousel-prev" ? "cursor-prev" : ""
      }`}
      onClick={(e) => handleNavigation(e.clientX > e.currentTarget.offsetWidth / 2)}
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover absolute top-0 left-0 max-sm:object-fill"
        style={{
          opacity: fade ? 0 : 1,
          transition: "opacity 1.5s ease-in-out",
        }}
      />

      {/* Rotated Right-facing Arrow SVG */}
      <svg
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rotate-90 cursor-pointer"
        width="48"
        height="48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="white"
        onClick={scrollToProjects}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

export default Carousel;
