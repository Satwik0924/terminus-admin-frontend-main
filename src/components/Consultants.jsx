import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const ConsultantsAndPartners = () => {
  const controls = useAnimation();
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("consultants-header");
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight / 2;
      const isBeyondThreshold = window.scrollY > 800; // Adjust threshold height here

      if (isFullyVisible && isBeyondThreshold && !hasTriggered) {
        controls.start({
          color: "#F58220",
          transition: { duration: 0.7 },
        });
        setHasTriggered(true);
      } else if (!isFullyVisible) {
        controls.start({
          color: "#D3D3D3",
          transition: { duration: 0.3 },
        });
        setHasTriggered(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, hasTriggered]);

  return (
    <div className="py-20 px-8 font-[Arial,sans-serif] flex items-left justify-left w-full">
      <div className="sm:w-[90%] w-[95%]">
        {/* Section Header */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 px-4 justify-left items-left place-items-left">
          {/* Logos */}
          {[
            {
              src: "/assets/Artboard 1 copy 2.png",
              alt: "Landbase Consulting",
            },
            {
              src: "/assets/Artboard 1 copy 3.png",
              alt: "Emerzhent",
            },
            {
              src: "/assets/Artboard 1 copy 4.png",
              alt: "Marriott",
            },
            {
              src: "/assets/Artboard 1 copy 5.png",
              alt: "PGP Architects",
            },
            {
              src: "/assets/Artboard 1 copy 6.png",
              alt: "IPDM Services",
            },
            {
              src: "/assets/Artboard 1 copy 7.png",
              alt: "Zaki & Associates",
            },
            {
              src: "/assets/Artboard 1 copy 8.png",
              alt: "Studio Chintala",
            },
            {
              src: "/assets/Artboard 1 copy 9.png",
              alt: "Aufait",
            },
            {
              src: "/assets/Artboard 1 copy 10.png",
              alt: "Image Alt 1",
            },
            {
              src: "/assets/Artboard 1 copy 11.png",
              alt: "Image Alt 2",
            },
            {
              src: "/assets/Artboard 1 copy 12.png",
              alt: "Image Alt 3",
            },
            {
              src: "/assets/Artboard 1 copy 13.png",
              alt: "Image Alt 4",
            },
            {
              src: "/assets/Artboard 1 copy 14.png",
              alt: "Image Alt 5",
            },
            {
              src: "/assets/Artboard 1 copy 15.png",
              alt: "Image Alt 6",
            },
            {
              src: "/assets/Artboard 1 copy 16.png",
              alt: "Image Alt 2",
            },
            {
              src: "/assets/Artboard 1 copy 17.png",
              alt: "Image Alt 3",
            },
            {
              src: "/assets/Artboard 1 copy 18.png",
              alt: "Image Alt 4",
            },
            {
              src: "/assets/Artboard 1 copy 19.png",
              alt: "Image Alt 5",
            },
            {
              src: "/assets/Artboard 1 copy 20.png",
              alt: "Image Alt 6",
            },
            {
              src: "/assets/Artboard 1 copy 21.png",
              alt: "Image Alt 4",
            },
            {
              src: "/assets/Artboard 1 copy 22.png",
              alt: "Image Alt 5",
            },
            {
              src: "/assets/Artboard 1 copy 23.png",
              alt: "Image Alt 6",
            },
          ].map((logo, index) => (
            <div key={index}>
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  width: "300px",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
                className="max-md:!w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantsAndPartners;
