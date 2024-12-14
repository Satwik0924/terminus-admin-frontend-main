import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [commercialProjects, setCommercialProjects] = useState([]);
  const [residentialProjects, setResidentialProjects] = useState([]);
  const [hospitalityProjects, setHospitalityProjects] = useState([]);
  const [lifeSciencesProjects, setLifeSciencesProjects] = useState([]);

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
          categorizeProjects(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Categorize projects into different sections based on type
    const categorizeProjects = (projects) => {
      setCommercialProjects(projects.filter((project) => project.type === "commercial"));
      setResidentialProjects(projects.filter((project) => project.type === "residential"));
      setHospitalityProjects(projects.filter((project) => project.type === "hospitality"));
      setLifeSciencesProjects(projects.filter((project) => project.type === "life Sciences"));
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
              color: ["#F58220"],
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

  return (
    <div>
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
          <ul className="list-none pl-8 text-5xl leading-2 tracking-tight space-y-2">
            <li>
              <h1 className="mb-2 text-primary-foreground">Key Projects</h1>{" "}
              {/* Font size kept the same as the list items */}
            </li>
            <li>
              <a href="#commercial" className="no-underline text-foreground hover:text-primary-foreground">
                Commercial
              </a>
            </li>
            <li>
              <a href="#residential" className="no-underline text-foreground hover:text-primary-foreground">
                Residential
              </a>
            </li>
            <li>
              <a href="#hospitality" className="no-underline text-foreground hover:text-primary-foreground">
                Hospitality
              </a>
            </li>
            <li>
              <a href="#lifesciences" className="no-underline text-foreground hover:text-primary-foreground">
                Life Sciences
              </a>
            </li>
            <li>
              <a href="#lifesciences" className="no-underline text-foreground hover:text-primary-foreground">
                Retail
              </a>
            </li>
          </ul>
          <div className="grid grid-cols-2 mt-8 px-2 gap-2 w-3/4">
            {projects
              ?.flatMap((project) => project.tags)
              .map((tag, index) => (
                <div key={index} className="flex items-center justify-center">
                  <span className="px-2 py-1 text-sm text-foreground font-bold bg-foreground/20 text-center transition duration-300 ease-in-out hover:bg-primary-foreground hover:text-white w-full">
                    {tag}
                  </span>
                </div>
              ))}
          </div>
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
              className="md:text-[5.3rem] leading-none text-5xl py-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
            >
              Commercial
            </motion.h1>

            {/* Projects */}
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {commercialProjects.map((project) => (
                  <div key={project._id} className=" overflow-hidden group max-w-xs mx-auto">
                    <div className="relative w-full h-[450px] overflow-hidden mb-3">
                      <a href={`/projects/${project._id}`} className="relative w-full h-80 overflow-hidden">
                        {/* Image */}
                        <img
                          src={project.images?.[0]}
                          alt={project.title}
                          className="w-full h-full object-cover transition duration-500 group-hover:blur-[2px]"
                        />
                        {/* Overlay description */}
                        <div className="absolute inset-0 flex justify-top items-top bg-white/30 bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500 [word-spacing:4px]">
                          <p className="text-black text-left text-xl p-4">
                            {project.description || "No description available"}
                          </p>
                        </div>
                      </a>
                    </div>

                    {/* Project Details */}
                    <div className="p-0 bg-white">
                      <h2 className="font-bold text-2xl tracking-tight text-black mb-1">{project.title}</h2>
                      <p className="text-2xl text-black leading-3">{project.location}</p>
                      <p className="text-2xl text-black mb-4 mt-3 leading-4 ">{project.yearOfCompletion}</p>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {project.tags?.map((tag, index) => (
                          <div key={index} className="flex items-center justify-center">
                            <span className="px-2 py-1 text-sm text-foreground font-bold bg-foreground/20 text-center transition duration-300 ease-in-out hover:bg-primary-foreground hover:text-white w-full">
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <span className="px-2 py-1 text-sm bg-foreground/20 text-foreground text-center font-bold transition duration-300 ease-in-out hover:bg-primary-foreground hover:text-white">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  marginBottom: "10px",
                }}
              >
                Clientele
              </p>
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
                        textAlign: "left",
                        fontWeight: "bold",
                        marginTop: index === 0 ? "0" : "unset", // No margin for the first company
                      }}
                      className="!text-foreground !font-bold !text-2xl"
                    >
                      {company}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Other Sections */}
          {[
            { id: "residential", title: "Residential", projects: residentialProjects, controls: controlsResidential },
            { id: "hospitality", title: "Hospitality", projects: hospitalityProjects, controls: controlsHospitality },
            {
              id: "lifesciences",
              title: "Life Sciences",
              projects: lifeSciencesProjects,
              controls: controlsLifeSciences,
            },
          ].map(({ id, title, projects, controls }) => (
            <div key={id} id={id} style={{ textAlign: "left" }}>
              <motion.h1
                animate={controls}
                initial={{ color: "#D3D3D3" }}
                className="md:text-[5.3rem] leading-none text-5xl py-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
              >
                {title}
              </motion.h1>

              {/* Projects */}
              <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {projects.map((project) => (
                    <div key={project._id} className=" overflow-hidden group max-w-xs mx-auto">
                      <div className="relative w-full h-[450px] overflow-hidden mb-3">
                        <a href={`/projects/${project._id}`} className="relative w-full h-80 overflow-hidden">
                          {/* Image */}
                          <img
                            src={project.images?.[0]}
                            alt={project.title}
                            className="w-full h-full object-cover transition duration-500 group-hover:blur-[2px]"
                          />
                          {/* Overlay description */}
                          <div className="absolute inset-0 flex justify-top items-top bg-white/30 bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500 [word-spacing:4px]">
                            <p className="text-black text-left text-xl p-4">
                              {project.description || "No description available"}
                            </p>
                          </div>
                        </a>
                      </div>

                      {/* Project Details */}
                      <div className="p-0 bg-white">
                        <h2 className="font-bold text-2xl tracking-tight text-black mb-1">{project.title}</h2>
                        <p className="text-2xl text-black leading-3">{project.location}</p>
                        <p className="text-2xl text-black mb-4 mt-3 leading-4 ">{project.yearOfCompletion}</p>
                        <div className="grid grid-cols-2 gap-2 w-full">
                          {project.tags?.map((tag, index) => (
                            <div key={index} className="flex items-center justify-center">
                              <span className="px-2 py-1 text-sm text-foreground font-bold bg-foreground/20 text-center transition duration-300 ease-in-out hover:bg-primary-foreground hover:text-white w-full">
                                {tag}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <span className="px-2 py-1 text-sm bg-foreground/20 text-foreground text-center font-bold transition duration-300 ease-in-out hover:bg-primary-foreground hover:text-white">
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    marginBottom: "10px",
                  }}
                >
                  Clientele
                </p>
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
                          textAlign: "left",
                          fontWeight: "bold",
                          marginTop: index === 0 ? "0" : "unset", // No margin for the first company
                        }}
                        className="!text-foreground !font-bold !text-2xl"
                      >
                        {company}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
