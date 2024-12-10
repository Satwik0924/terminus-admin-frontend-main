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

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "1200px",
      margin: "auto",
    },
    title: {
      fontSize: "4rem",
      fontWeight: "bold",
      margin: "0 0 40px 0",
      transition: "color 0.9s ease",
      textAlign: "left",
    },
    section: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "60px",
      gap: "20px",
      flexDirection: "row",
    },
    textContent: {
      flex: 1,
      fontSize: "1.2rem",
      color: "#333",
      lineHeight: "1.8",
    },
    readMore: {
      color: "#F37021",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",
    },
    imageContent: {
      flex: 1,
      position: "relative",
      textAlign: "center",
    },
    image: {
      width: "100%",
      height: "auto",
      filter: "grayscale(100%)",
      borderRadius: "5px",
    },
    playButton: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "60px",
      height: "60px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    imageCaption: {
      color: "#F37021",
      fontWeight: "bold",
      marginTop: "10px",
    },
    // Responsive Adjustments
    "@media (max-width: 768px)": {
      title: {
        fontSize: "2.5rem",
        textAlign: "center",
      },
      section: {
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      },
      textContent: {
        fontSize: "1rem",
        marginBottom: "20px",
      },
      imageContent: {
        width: "100%",
      },
      image: {
        borderRadius: "10px",
      },
    },
  };

  return (
    <div style={styles.container}>
      {/* Animated Title */}
      <motion.h1
        id="missionTitle"
        animate={controlsTitle}
        initial={{ color: "#D3D3D3" }}
        style={styles.title}
      >
        Driven by a Mission
      </motion.h1>

      {/* Sections */}
      <div style={styles.section}>
        {/* Text Content */}
        <div style={styles.textContent}>
          <p>
            <strong>Mr. S.P. Reddy</strong> is a successful entrepreneur,
            active philanthropist, and investor whose experience spans across
            the USA and India in domains as diverse as Information Technology,
            Federal Government, and Real Estate Development.
          </p>
          <p style={styles.readMore}>Read more</p>
        </div>

        {/* Image Content */}
        <div style={styles.imageContent}>
          <img
            src="https://via.placeholder.com/500x300"
            alt="The Founder Chairman"
            style={styles.image}
          />
          <div style={styles.playButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#F37021">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p style={styles.imageCaption}>The Founder Chairman</p>
        </div>
      </div>

      <div style={styles.section}>
        {/* Text Content */}
        <div style={styles.textContent}>
          <p>
            <strong>Mr. S.P. Reddy</strong> is a visionary leader committed to
            driving innovation and excellence in every project he undertakes.
          </p>
          <p style={styles.readMore}>Read more</p>
        </div>

        {/* Image Content */}
        <div style={styles.imageContent}>
          <img
            src="https://via.placeholder.com/500x300"
            alt="Vision for the Future"
            style={styles.image}
          />
          <div style={styles.playButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#F37021">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p style={styles.imageCaption}>A Vision for the Future</p>
        </div>
      </div>
    </div>
  );
};

export default DrivenByMission;
