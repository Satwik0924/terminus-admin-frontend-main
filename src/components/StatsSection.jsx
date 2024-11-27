import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const StatsSection = () => {
  const controlsLine1 = useAnimation();
  const controlsLine2 = useAnimation();
  const controlsLine3 = useAnimation(); // New animation control for line3

  useEffect(() => {
    const handleScroll = () => {
      const line1 = document.getElementById("line1");
      const line2 = document.getElementById("line2");
      const line3 = document.getElementById("line3"); // Reference for line3

      if (line1) {
        const rect1 = line1.getBoundingClientRect();
        const isVisible1 = rect1.top >= 0 && rect1.top < window.innerHeight / 2;

        if (isVisible1) {
          controlsLine1.start({
            color: ["#FF5733", "#FFC300"], // Orange gradient
            transition: { duration: 1 },
          });
        } else {
          controlsLine1.start({
            color: "#D3D3D3", // Gray color when out of view
            transition: { duration: 1 },
          });
        }
      }

      if (line2) {
        const rect2 = line2.getBoundingClientRect();
        const isVisible2 = rect2.top >= 0 && rect2.top < window.innerHeight / 2;

        if (isVisible2) {
          controlsLine2.start({
            color: ["#FF5733", "#FFC300"], // Light orange gradient
            transition: { duration: 1 },
          });
        } else {
          controlsLine2.start({
            color: "#D3D3D3", // Gray color when out of view
            transition: { duration: 1 },
          });
        }
      }

      if (line3) {
        const rect3 = line3.getBoundingClientRect();
        const isVisible3 = rect3.top >= 0 && rect3.top < window.innerHeight / 2;

        if (isVisible3) {
          controlsLine3.start({
            color: ["#FF5733", "#FFC300"], // Orange gradient
            transition: { duration: 1 },
          });
        } else {
          controlsLine3.start({
            color: "#D3D3D3", // Gray color when out of view
            transition: { duration: 1 },
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controlsLine1, controlsLine2, controlsLine3]);

  return (
    <div style={{ textAlign: "left", margin: "2rem 0" }}>
      <motion.h1
        id="line1"
        animate={controlsLine1}
        initial={{ color: "#D3D3D3" }}
        style={{
          fontSize: "6rem",
          fontWeight: "bold",
          margin: "3rem 7rem",
        }}
      >
        7,340 MILLION SQ.FT. BUILT
      </motion.h1>

      <motion.h2
        id="line2"
        animate={controlsLine2}
        initial={{ color: "#D3D3D3" }}
        style={{
          fontSize: "6rem",
          fontWeight: "900",
          margin: "0.5rem 7rem",
        }}
      >
        12,595 MILLION SQ.FT. <br></br> IN THE PIPELINE
      </motion.h2>

      <motion.h2
        id="line3"
        animate={controlsLine3}
        initial={{ color: "#D3D3D3" }}
        style={{
          fontSize: "5rem",
          fontWeight: "500",
          margin: "8rem 7rem",
        }}
      >Crafting <br></br>

      Meaningful Spaces <br></br>
      
      for Work, Life, and Play
      </motion.h2>
    </div>
  );
};

export default StatsSection;
