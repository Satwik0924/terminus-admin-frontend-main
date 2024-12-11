import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { motion, useAnimation } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  // Animation controls for headings
  const controlsCommercial = useAnimation();
  const controlsResidential = useAnimation();
  const controlsHospitality = useAnimation();
  const controlsLifeSciences = useAnimation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://terminus-group-backend-1in9.onrender.com/forms/project");
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
          setFilteredProjects(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const handleScroll = () => {
      const sections = [
        { id: "commercial", controls: controlsCommercial },
        { id: "residential", controls: controlsResidential },
        { id: "hospitality", controls: controlsHospitality },
        { id: "lifesciences", controls: controlsLifeSciences },
      ];

      sections.forEach(({ id, controls }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.top < window.innerHeight / 2;

          if (isVisible) {
            controls.start({
              color: ["#FF5733", "#FFC300"], // Orange gradient
              transition: { duration: 1 },
            });
          } else {
            controls.start({
              color: "#D3D3D3", // Gray color when out of view
              transition: { duration: 1 },
            });
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.tags && project.tags.includes(filter)));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      {/* Side Sticky Section */}
      <div
        style={{
          flex: "1",
          position: "sticky",
          top: "150px",
          height: "100%",
          paddingRight: "20px",
          display: window.innerWidth > 768 ? "block" : "none",
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: "30px",
            fontSize: "2rem",
            lineHeight: "1.5",
          }}
        >
          <li>
            <h1 className="mb-2">Key Projects</h1>
          </li>
          <li>
            <a href="#commercial" style={{ textDecoration: "none", color: "inherit" }}>
              Commercial
            </a>
          </li>
          <li>
            <a href="#residential" style={{ textDecoration: "none", color: "inherit" }}>
              Residential
            </a>
          </li>
          <li>
            <a href="#hospitality" style={{ textDecoration: "none", color: "inherit" }}>
              Hospitality
            </a>
          </li>
          <li>
            <a href="#lifesciences" style={{ textDecoration: "none", color: "inherit" }}>
              Life Sciences
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: "3",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          width: "100%",
        }}
      >
        {/* Commercial Section */}
        <div id="commercial" style={{ textAlign: "left" }}>
          <motion.h1
            animate={controlsCommercial}
            initial={{ color: "#D3D3D3" }}
            style={{
              fontWeight: "300",
              fontSize: "4rem",
              margin: "20px 0",
            }}
          >
            Commercial
          </motion.h1>
          <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <p style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px" }}>Clientele</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "16px",
              }}
            >
              {[...Array(8)].map((_, index) => (
                <p
                  key={index}
                  style={{ padding: "10px", borderRadius: "5px", textAlign: "center", fontWeight: "bold" }}
                >
                  Google
                </p>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="shadow-md rounded-md overflow-hidden max-w-sm max-h-120">
                  <img src={project.images?.[0]} alt={project.title} className="w-full h-60 object-cover" />
                  <div className="p-4">
                    <h2 className="font-light text-2xl mb-2">{project.title}</h2>
                    <p className="font-normal text-lg mb-2">{project.location}</p>
                    <p className="font-normal text-lg mb-2">{project.yearOfCompletion}</p>
                    <p className="font-normal text-lg mb-2">{project.status}</p>
                    <a href={`/projects/${project._id}`} className="font-normal text-lg no-underline text-inherit">
                      View Project Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Residential Section */}
        <div id="residential" style={{ textAlign: "left" }}>
          <motion.h1
            animate={controlsResidential}
            initial={{ color: "#D3D3D3" }}
            style={{
              fontWeight: "300",
              fontSize: "4rem",
              margin: "20px 0",
            }}
          >
            Residential
          </motion.h1>
          <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <p style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px" }}>Clientele</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "16px",
              }}
            >
              {[...Array(8)].map((_, index) => (
                <p
                  key={index}
                  style={{ padding: "10px", borderRadius: "5px", textAlign: "center", fontWeight: "bold" }}
                >
                  Google
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Hospitality Section */}
        <div id="hospitality" style={{ textAlign: "left" }}>
          <motion.h1
            animate={controlsHospitality}
            initial={{ color: "#D3D3D3" }}
            style={{
              fontWeight: "300",
              fontSize: "4rem",
              margin: "20px 0",
            }}
          >
            Hospitality
          </motion.h1>
          <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <p style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px" }}>Clientele</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "16px",
              }}
            >
              {[...Array(8)].map((_, index) => (
                <p
                  key={index}
                  style={{ padding: "10px", borderRadius: "5px", textAlign: "center", fontWeight: "bold" }}
                >
                  Google
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Life Sciences Section */}
        <div id="lifesciences" style={{ textAlign: "left" }}>
          <motion.h1
            animate={controlsLifeSciences}
            initial={{ color: "#D3D3D3" }}
            style={{
              fontWeight: "300",
              fontSize: "4rem",
              margin: "20px 0",
            }}
          >
            Life Sciences
          </motion.h1>
          <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <p style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px" }}>Clientele</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "16px",
              }}
            >
              {[...Array(8)].map((_, index) => (
                <p
                  key={index}
                  style={{ padding: "10px", borderRadius: "5px", textAlign: "center", fontWeight: "bold" }}
                >
                  Google
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
