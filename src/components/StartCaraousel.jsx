import { useEffect, useRef, useState } from "react";

const CHANGE_IMAGE_INTERVAL = 6 * 1000;

const Carousel = () => {
  const images = Array.from({ length: 6 }, (_, i) => `/assets/Artboard ${i + 9}.png`);

  const [currentIndex, setCurrentIndex] = useState(Math.floor((images.length - 1) / 2));
  const [fade, setFade] = useState(false);
  const [carouselCursor, setCarouselCursor] = useState("default");
  const intervalRef = useRef(null);

  const scrollToProjects = () => {
    const projects = document.getElementById("stats");
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
    }, 1000);
  };

  const goToPrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      setFade(false);
    }, 1000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleNavigation = (isNext) => {
    if (isNext) {
      goToNext();
    } else {
      goToPrev();
    }
    resetInterval();
  };

  const handleMousePointer = (e) => {
    const carousel = e.currentTarget;
    const image = carousel.querySelector("img");
    const imageRect = image.getBoundingClientRect();
    const mouseX = e.clientX - imageRect.left;
    const isRightHalf = mouseX > imageRect.width / 2;
    setCarouselCursor(isRightHalf ? "carousel-next" : "carousel-prev");
  };

  return (
    <div
      onMouseMove={handleMousePointer}
      onMouseLeave={() => setCarouselCursor("default")}
      className={`w-full h-screen relative overflow-hidden ${
        carouselCursor === "carousel-next" ? "cursor-next" : carouselCursor === "carousel-prev" ? "cursor-prev" : ""
      }`}
      onClick={(e) => handleNavigation(e.clientX > e.currentTarget.offsetWidth / 2)}
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover absolute top-0 left-0"
        style={{
          opacity: fade ? 0 : 1,
          transition: "opacity 1.5s ease-in-out",
        }}
      />

      {/* Bottom Arrow */}
      <svg
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 rotate-90 cursor-pointer"
        width="48"
        height="48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="white"
        onClick={scrollToProjects}
      >
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="4" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

export default Carousel;
