import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const ProjectsGrid = () => {
  const headingAnimation = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const heading = document.getElementById("heading");
      if (heading) {
        const rect = heading.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top < window.innerHeight / 2;

        if (isVisible) {
          headingAnimation.start({
            color: "#FF5733", // Bright orange
            transition: { duration: 0.7 },
          });
        } else {
          headingAnimation.start({
            color: "#A0A0A0", // Light gray
            transition: { duration: 0.7 },
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headingAnimation]);

  const projects = [
    {
      title: "Commercial",
      image:
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068363/image-93324a5d-c5e7-4877-9b6f-717bbaa0383a.jpg?e=webp&cX=88&cY=0&cW=204&cH=460",
    },
    { title: "Retail", image: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-07c524f0-fccb-443a-84b4-ed474e9bd278.jpg?w=1064&e=webp&cX=723&cY=0&cW=353&cH=797" },
    { title: "Residential", image: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5036787/image-898e55a6-fb65-48e6-8a98-f284706cbd7e.jpg?e=webp&cX=88&cY=0&cW=204&cH=460" },
    { title: "Hospitality", image: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5036787/image-8d40d5f5-24ac-4c8a-b60b-689f448d0319.jpg?e=webp&cX=88&cY=0&cW=204&cH=460" },
    { title: "Life Sciences", image: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068970/image-a10a7f2b-0283-4585-9525-c09777fe2899.jpg" },
  ];

  // Inline styles for CSS-in-JSX
  const styles = {
    section: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      padding: "2rem 1rem",
      backgroundColor: "#f9fafb",
    },
    heading: {
      fontSize: "4rem",
      textAlign: "left",
      
      marginBottom: "5rem",
      color: "#A0A0A0",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1.5rem",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      width: "12rem",
      height: "17rem",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      position: "relative",
      transform: "scale(1)",
      transition: "transform 0.3s ease-in-out",
      backgroundColor: "#ffffff",
    },
    cardHover: {
      transform: "scale(1.05)",
    },
    cardImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    cardOverlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.3), transparent)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "1rem",
    },
    cardTitle: {
      color: "white",
      fontSize: "1.25rem",
      fontWeight: "600",
    },
    cardLink: {
      color: "#FF5733",
      fontSize: "0.875rem",
      textDecoration: "none",
      marginTop: "0.5rem",
    },
  };

  return (
    <section style={styles.section}>
      {/* Heading */}
      <motion.h1
        id="heading"
        animate={headingAnimation}
        initial={{ color: "#A0A0A0" }}
        style={styles.heading}
      >
        Explore Our Projects
      </motion.h1>

      {/* Responsive Grid */}
      <div style={styles.grid}>
        {projects.map((project, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={project.image}
              alt={project.title}
              style={styles.cardImage}
            />
            <div style={styles.cardOverlay}>
              <h2 style={styles.cardTitle}>{project.title}</h2>
              <a href="#" style={styles.cardLink}>
                View Projects →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;
