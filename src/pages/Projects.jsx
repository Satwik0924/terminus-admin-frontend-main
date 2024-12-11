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
              color: ["#FF5733"], // Orange gradient
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
        <ul className="list-none pl-8 text-4xl leading-relaxed">
          <li>
            <h1 className="mb-2 text-gray-500 ">Key Projects</h1> {/* Font size kept the same as the list items */}
          </li>
          <li>
            <a href="#commercial" className="no-underline text-gray-400 hover:text-orange-500">
              Commercial
            </a>
          </li>
          <li>
            <a href="#residential" className="no-underline  text-gray-400 hover:text-orange-500">
              Residential
            </a>
          </li>
          <li>
            <a href="#hospitality" className="no-underline  text-gray-400 hover:text-orange-500">
              Hospitality
            </a>
          </li>
          <li>
            <a href="#lifesciences" className="no-underline text-gray-400 hover:text-orange-500">
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
              fontWeight: "500",
              fontSize: "4rem",
              margin: "20px 0",
            }}
          >
            Commercial
          </motion.h1>
          <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="shadow-md rounded-md overflow-hidden group max-w-xs mx-auto">
                  {/* Image container with hover effects */}
                  <div className="relative w-full h-80 overflow-hidden">
                    {/* Image */}
                    <img
                      src={project.images?.[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:blur-sm"
                    />
                    {/* Overlay description fetched from backend */}
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500">
                      <p className="text-white text-center text-sm px-4">
                        {project.description || "No description available"}
                      </p>
                    </div>
                  </div>

                  {/* Project details */}
                  <div className="p-4 bg-white">
                    <h2 className="font-semibold text-lg mb-1">{project.title}</h2>
                    <p className="text-sm text-gray-600 mb-1">{project.location}</p>
                    <p className="text-sm text-gray-600 mb-3">{project.yearOfCompletion}</p>
                    <div className="flex gap-2 flex-wrap mb-2">
                      {/* Render tags */}
                      {project.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-200 font-medium transition duration-300 ease-in-out hover:bg-orange-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Render status */}
                    <div className="mt-2">
                      <span className="px-2 py-1 text-xs bg-gray-200 font-medium transition duration-300 ease-in-out hover:bg-orange-500">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
              <p style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px" }}>Clientele</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "16px",
                }}
              >
                {["Microchip", "ADP", "NetenRich", "Amazon", "Verizon", "Samsung", "Google", "Intel"].map(
                  (company, index) => (
                    <p
                      key={index}
                      style={{
                        padding: "10px",
                        borderRadius: "5px",
                        textAlign: "center",
                        fontWeight: "bold",
                        // Optional background for better visibility
                      }}
                    >
                      {company}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Residential Section */}
        <div id="residential" style={{ textAlign: "left" }}>
          <motion.h1
            animate={controlsResidential}
            initial={{ color: "#D3D3D3" }}
            style={{
              fontWeight: "500",
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
              {["Microchip", "ADP", "NetenRich", "Amazon", "Verizon", "Samsung", "Google", "Intel"].map(
                (company, index) => (
                  <p
                    key={index}
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      textAlign: "center",
                      fontWeight: "bold",
                      // Optional background for better visibility
                    }}
                  >
                    {company}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Hospitality Section */}
        <div id="hospitality" style={{ textAlign: "left" }}>
          <motion.h1
            animate={controlsHospitality}
            initial={{ color: "#D3D3D3" }}
            style={{
              fontWeight: "500",
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
              {["Microchip", "ADP", "NetenRich", "Amazon", "Verizon", "Samsung", "Google", "Intel"].map(
                (company, index) => (
                  <p
                    key={index}
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      textAlign: "center",
                      fontWeight: "bold",
                      // Optional background for better visibility
                    }}
                  >
                    {company}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Life Sciences Section */}
        <div id="lifesciences" style={{ textAlign: "left" }}>
          <motion.h1
            animate={controlsLifeSciences}
            initial={{ color: "#D3D3D3" }}
            style={{
              fontWeight: "500",
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
              {["Microchip", "ADP", "NetenRich", "Amazon", "Verizon", "Samsung", "Google", "Intel"].map(
                (company, index) => (
                  <p
                    key={index}
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      textAlign: "center",
                      fontWeight: "bold",
                      // Optional background for better visibility
                    }}
                  >
                    {company}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
