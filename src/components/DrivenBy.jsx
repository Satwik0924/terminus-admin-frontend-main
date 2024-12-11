import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const DrivenByMission = () => {
  const controlsTitle = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const title = document.getElementById("missionTitle");

      if (title) {
        const rect = title.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top < window.innerHeight / 2;

        if (isVisible) {
          controlsTitle.start({
            color: ["#FF5733", "#FFC300"], // Gradient animation
            transition: { duration: 1 },
          });
        } else {
          controlsTitle.start({
            color: "#D3D3D3", // Gray color when out of view
            transition: { duration: 1 },
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controlsTitle]);

  return (
    <div className="font-sans py-20 px-3 max-w-screen-lg mx-10">
      <motion.h1
        id="missionTitle"
        animate={controlsTitle}
        initial={{ color: "#D3D3D3" }}
        className="text-7xl mb-10 transition-colors duration-900 ease-in-out text-left md:text-left tracking-tighter"
      >
        Driven by a Mission
      </motion.h1>
      <div className="font-sans py-20 px-10 max-w-screen-lg mx-auto items-center">
        {/* Animated Title */}

        {/* First Section */}
        <div className="flex items-start mb-28 gap-5 flex-col-reverse md:flex-row max-md:text-center max-md:items-center">
          {/* Text Content */}
          <div className="flex-1 text-base text-gray-400 leading-relaxed tracking-tighter">
            <p>
              <strong>Mr. S.P. Reddy</strong> is a successful entrepreneur, active philanthropist, and investor whose
              experience spans across the USA and India in domains as diverse as Information Technology, Federal
              Government, and Real Estate Development.
            </p>
            <p className="text-orange-600 font-bold mt-3 cursor-pointer">Read more</p>
          </div>

          {/* Video Content */}
          <div className="flex-1 w-full h-full max-w-full">
            <div className="relative w-full h-full" style={{ paddingBottom: "56.25%" }}>
              {" "}
              {/* 16:9 aspect ratio */}
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video URL
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-orange-600 font-bold mt-3">The Founder Chairman</p>
          </div>
        </div>

        {/* Second Section */}
        <div className="flex items-start mb-16 gap-5 flex-col-reverse md:flex-row max-md:text-center max-md:items-center">
          {/* Text Content */}
          <div className="flex-1 text-base text-gray-400 tracking-tighter leading-relaxed">
            <p>
              <strong>Mr. S.P. Reddy</strong> is a visionary leader committed to driving innovation and excellence in
              every project he undertakes.
            </p>
            <p className="text-orange-600 font-bold mt-3 cursor-pointer">Read more</p>
          </div>

          {/* Image Content */}
          {/* Video Content */}
          <div className="flex-1 w-full h-full max-w-full">
            <div className="relative w-full h-full" style={{ paddingBottom: "56.25%" }}>
              {" "}
              {/* 16:9 aspect ratio */}
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video URL
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-orange-600 font-bold mt-3">The Founder Chairman</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivenByMission;
