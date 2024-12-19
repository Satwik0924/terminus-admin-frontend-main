import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [commercialProjects, setCommercialProjects] = useState([]);
  const [residentialProjects, setResidentialProjects] = useState([]);
  const [hospitalityProjects, setHospitalityProjects] = useState([]);
  const [lifeSciencesProjects, setLifeSciencesProjects] = useState([]);
  const [activeSection, setActiveSection] = useState("");

  // Animation controls for headings
  const controlsCommercial = useAnimation();
  const controlsResidential = useAnimation();
  const controlsHospitality = useAnimation();
  const controlsLifeSciences = useAnimation();
  const controlsRetail = useAnimation();
  const controlsEducation = useAnimation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://terminus-group-backend-1in9.onrender.com/forms/project");
        if (response.data && response.data.length > 0) {
          console.log("projects data:", response.data);
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

    // Create intersection observer for navigation highlighting
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    // Observe all sections for navigation
    const sections = ["commercial", "residential", "hospitality", "lifesciences", "retail", "education"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) navObserver.observe(element);
    });

    const handleScroll = () => {
      const sections = [
        { id: "commercial", controls: controlsCommercial },
        { id: "residential", controls: controlsResidential },
        { id: "hospitality", controls: controlsHospitality },
        { id: "lifesciences", controls: controlsLifeSciences },
        { id: "retail", controls: controlsRetail },
        { id: "education", controls: controlsEducation },
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
              color: "#D3D3D3",
              transition: { duration: 1 },
            });
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) navObserver.unobserve(element);
      });
    };
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
          <ul className="list-none pl-8 text-5xl leading-1 tracking-tighter space-y-0">
            <li>
              <h1 className="mb-5 text-primary-foreground">Key Projects</h1>
            </li>
            {[
              { id: "commercial", label: "Commercial" },
              { id: "residential", label: "Residential" },
              { id: "hospitality", label: "Hospitality" },
              { id: "lifesciences", label: "Life Sciences" },
              { id: "retail", label: "Retail" },
              { id: "education", label: "Education" },
            ].map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`no-underline text-4xl transition-colors duration-300 ${
                    activeSection === id ? "text-[#F58220]" : "text-foreground hover:text-primary-foreground"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 mt-8 px-2 gap-2 w-full">
            <div className="flex space-x-4">
              {["completed", "incompleted"].map((status, index) => (
                <div key={index} className="flex items-center justify-center flex-1">
                  <span className="px-4 py-2 text-sm text-foreground font-bold bg-foreground/20 text-center transition duration-300 ease-in-out hover:bg-primary-foreground hover:text-white w-full">
                    {status}
                  </span>
                </div>
              ))}
            </div>
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
                  // ... Commercial projects content (unchanged)
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
                      <div className="flex items-center space-x-4">
                        <p className="text-2xl text-black leading-3">{project.location}</p>
                        <p className="text-2xl text-black leading-4">{project.yearOfCompletion}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 w-full"></div>

                      <div className="grid grid-cols-2 gap-2 mt-8">
                        <span className="px-2 py-1 text-sm bg-foreground/20 text-foreground text-center font-bold transition duration-300 ease-in-out hover:bg-primary-foreground hover:text-white">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clientele section */}
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
              {/* ... Clientele content (unchanged) ... */}
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
                        marginTop: index === 0 ? "0" : "unset",
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
                        <div className="flex items-center space-x-4">
                          <p className="text-2xl text-black leading-3">{project.location}</p>
                          <p className="text-2xl text-black leading-4">{project.yearOfCompletion}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 w-full"></div>

                        <div className="grid grid-cols-2 gap-2 mt-8">
                          <span className="px-2 py-1  text-sm bg-foreground/20 text-foreground text-center font-bold transition duration-300 ease-in-out hover:bg-primary-foreground hover:text-white">
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
          <div id="retail" style={{ textAlign: "left" }}>
            <motion.h1
              animate={controlsRetail}
              initial={{ color: "#D3D3D3" }}
              className="md:text-[5.3rem] leading-none text-5xl py-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
            >
              Retail
            </motion.h1>

            {/* Projects */}

            {/* Logo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-9 mt-2">
              {[
                "/assets/image1.jpg",
                "/assets/image2.png",
                "/assets/image3.png",
                "/assets/image4.png",
                "/assets/image5.png",
                "/assets/image6.png",
                "/assets/image7.png",
                "/assets/image8.png",
                "/assets/image9.jpg",
                "/assets/image10.png",
                "/assets/image11.png",
                "/assets/image12.png",
                "/assets/image13.png",
                "/assets/image14.png",

                "/assets/image16.png",
                "/assets/image17.png",
                "/assets/image19.png",

                "/assets/image19.png",
                "/assets/image20.png",
                "/assets/image21.png",
                "/assets/image22.png",
                "/assets/image23.png",
              ].map((logo, index) => (
                <div key={index} className="flex items-center justify-center p-4">
                  <img src={logo} alt={`Logo ${index + 1}`} className="max-w-full h-auto" />
                </div>
              ))}
            </div>
          </div>

          <div id="education" style={{ textAlign: "left" }}>
            <motion.h1
              animate={controlsEducation}
              initial={{ color: "#D3D3D3" }}
              className="md:text-[5.3rem] leading-none text-5xl py-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
            >
              Education
            </motion.h1>

            {/* Description */}
            <p className="text-md text-gray-600 mb-4 w-2/3 tracking-tigher">
              In 2023, Terminus group deepened their relationship with Capella – India’s leading edu infra company.
              Their commitment to reshaping the educational experience aims to meet the growing demand for quality
              education through state-of-the-art facilities and a unique business model. By leveraging their expertise
              in educational infrastructure, Capella is positioning itself as a key player in revolutionizing the
              education sector in India, focusing on building sustainable, cutting-edge environments that support both
              learning and professional development. This partnership combines Capella’s education-focused
              infrastructure with Terminus’s real estate expertise, thus creating a robust platform to advance industry
              standards and help elevate real estate education across the country.
            </p>

            {/* Read More */}
            <a href="#" className="text-md font-bold text-gray-600 text-bold hover:text-primary-foreground">
              Read More
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
