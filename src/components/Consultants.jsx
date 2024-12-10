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
      const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      const isBeyondThreshold = window.scrollY > 700; // Adjust threshold height here

      if (isFullyVisible && isBeyondThreshold && !hasTriggered) {
        controls.start({
          color: "#FF5733",
          transition: { duration: 0.3 },
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
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Section Header */}
      <motion.h1
        id="consultants-header"
        animate={controls}
        initial={{ color: "#D3D3D3" }}
        style={{
          fontSize: "2.5rem",
          marginBottom: "2rem",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Consultants & Partners
      </motion.h1>

      {/* Responsive Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "2rem",
          padding: "0 1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Logos */}
        {[
          {
            src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-8f5e2739-5e1a-46db-908c-889e23d399cc.png?e=webp&nll=true&cX=3&cY=0&cW=354&cH=100",
            alt: "Landbase Consulting",
          },
          {
            src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-6aa6c2ce-4282-4d9c-916f-70ea92aa5f9a.png?e=webp&nll=true&cX=0&cY=0&cW=360&cH=99",
            alt: "Emerzhent",
          },
          {
            src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-5d4a121b-3250-4425-899c-f33c37e84b05.png?e=webp&nll=true&cX=53&cY=0&cW=254&cH=100",
            alt: "Marriott",
          },
          {
            src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-f4cf40df-ec54-4b8e-8b03-216503c2afc1.png?e=webp&nll=true&cX=12&cY=0&cW=339&cH=100",
            alt: "PGP Architects",
          },
          {
            src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-fef74f86-68da-4332-8bb9-d5c0f8030bf2.png?e=webp&nll=true",
            alt: "IPDM Services",
          },
          {
            src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-9cacdbf4-f68a-4dae-a4e2-aa694dc1837b.png?w=343&e=webp&nll=true&cX=71&cY=0&cW=219&cH=100",
            alt: "Zaki & Associates",
          },
          {
            src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-38e84e26-2559-4871-89fb-9186f02e3fbd.png?w=372&e=webp&nll=true&cX=0&cY=643&cW=1763&cH=476",
            alt: "Studio Chintala",
          },
          {
            src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-9c57e515-69b2-4e8e-a8bc-d05e7c950094.png?e=webp&nll=true&cX=0&cY=1&cW=360&cH=97",
            alt: "Aufait",
          },
        ].map((logo, index) => (
          <div key={index}>
            <img
              src={logo.src}
              alt={logo.alt}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultantsAndPartners;
