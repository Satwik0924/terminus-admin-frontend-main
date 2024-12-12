import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useEffect } from "react";

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
            color: "#F58220",
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
    {
      title: "Retail",
      image:
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-07c524f0-fccb-443a-84b4-ed474e9bd278.jpg?w=1064&e=webp&cX=723&cY=0&cW=353&cH=797",
    },
    {
      title: "Residential",
      image:
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5036787/image-898e55a6-fb65-48e6-8a98-f284706cbd7e.jpg?e=webp&cX=88&cY=0&cW=204&cH=460",
    },
    {
      title: "Hospitality",
      image:
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5036787/image-8d40d5f5-24ac-4c8a-b60b-689f448d0319.jpg?e=webp&cX=88&cY=0&cW=204&cH=460",
    },
    {
      title: "Life Sciences",
      image:
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068970/image-a10a7f2b-0283-4585-9525-c09777fe2899.jpg?w=559&e=webp&cX=811&cY=0&cW=846&cH=1920",
    },
  ];

  // Inline styles for CSS-in-JSX
  const styles = {
    section: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "auto ",
      padding: "5rem 0",
      backgroundColor: "#f9fafb",
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
      height: "20rem",
      borderRadius: "0.5rem",
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
      color: "#F58220",
      fontSize: "0.875rem",
      textDecoration: "none",
      marginTop: "0.5rem",
    },
  };

  return (
    <section className="flex flex-col justify-center items-center h-auto lg:py-40 py-20 w-full">
      <div className="sm:w-[90%] w-[95%]">
        {/* Heading */}
        <motion.h1
          id="heading"
          animate={headingAnimation}
          initial={{ color: "#A0A0A0" }}
          style={styles.heading}
          className="md:text-[5.3rem] leading-none text-5xl mb-20 font-medium text-[#A0A0A0] text-left tracking-tighter"
        >
          Explore Our Projects
        </motion.h1>
        {/* Responsive Grid */}
        <div className="flex flex-wrap gap-8 justify-center items-center">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-72 h-[70dvh] max-sm:w-full overflow-hidden relative hover:scale-[1.03] transition-transform duration-500 ease-in-out bg-white flex flex-col"
            >
              {/* Image Section */}
              <div className="flex-grow">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>

              {/* Overlay Section */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                {/* Heading at Top Left */}
                <h2 className="text-white text-4xl font-bold">{project.title}</h2>

                {/* "View Projects" at Bottom Left */}
                <a
                  href="#"
                  className="text-primary-foreground hover:text-white transition-colors text-md mx-auto gap-2 font-medium flex items-center text-2xl font-serif"
                >
                  View Projects
                  <ArrowRight className="stroke-white size-6" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
