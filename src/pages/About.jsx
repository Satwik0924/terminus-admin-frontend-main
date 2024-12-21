import AwardsComponent from "@/components/Awards";
import ConsultantsAndPartners from "@/components/Consultants";
import DrivenByMission from "@/components/DrivenBy";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/imageslider";
import OfficeComponent from "@/components/OfficeGrid";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {
  const [activeSection, setActiveSection] = useState("");

  // Animation controls for headings
  const controlsCommercial = useAnimation();
  const controlsResidential = useAnimation();
  const controlsHospitality = useAnimation();
  const controlsLifeSciences = useAnimation();
  const controlsRetail = useAnimation();
  const controlsEducation = useAnimation();

  useEffect(() => {
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
      <div style={{ display: "flex", flexDirection: "row", fontFamily: "Arial, sans-serif", padding: "20px" }}>
        {/* Side Sticky Section */}
        <div
          style={{
            flex: "2",
            position: "sticky",
            top: "150px",
            height: "100%",
            paddingRight: "20px",
            display: window.innerWidth > 768 ? "block" : "none",
          }}
        >
          <ul className="list-none pl-8 text-5xl leading-1 tracking-tighter space-y-0">
            {[
              { id: "commercial", label: "Team" },
              { id: "residential", label: "News&Media" },
              { id: "hospitality", label: "Philanthropy" },
              { id: "lifesciences", label: "Awards" },
              { id: "retail", label: "Consultants & Partners" },
              // { id: "education", label: "Education" },
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
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: "3",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            paddingRight: "30px",
            marginRight: "30px",
            width: "100%",
          }}
        >
          <div id="commercial" style={{ textAlign: "left" }}>
            <OfficeComponent />
            {/* <DrivenByMission /> */}
          </div>

          <div id="residential" style={{ textAlign: "left" }}>
            <motion.h1
              animate={controlsResidential}
              initial={{ color: "#D3D3D3" }}
              className="md:text-[5.3rem] leading-none text-5xl py-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
            >
              News & Media
            </motion.h1>
          </div>

          <div id="hospitality" style={{ textAlign: "left" }}>
            <motion.h1
              animate={controlsHospitality}
              initial={{ color: "#D3D3D3" }}
              className="md:text-[5.3rem] leading-none text-5xl py-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
            >
              Philanthrophy
            </motion.h1>
            <div className="philanthropy-section mx-0 text-left w-fulll px-4 py-8">
              <div className="philanthropy-text mb-6 left text-gray-800">
                <p className="text-lg text-left leading-relaxed tracking-tight">
                  At Terminus Group, we believe in giving back to the community. Our<br></br> philanthropic efforts
                  focus on creating lasting, positive impact by<br></br> supporting initiatives that foster education,
                  sustainability, and social<br></br> equity. Together, we aim to build a better tomorrow.
                </p>
              </div>
              <div className="philanthropy-images">
                <ImageSlider />
                <div className="secondary-images grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Image 1 */}
                  <div className="relative w-full h-[450px] overflow-hidden mb-3 group">
                    {/* Image */}
                    <img
                      src="https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-4c92c200-0b12-4881-9dca-0d54008841f0.jpg?e=webp&cX=21&cY=219&cW=497&cH=730"
                      alt="Philanthropy event 1"
                      className="w-full h-full object-cover transition duration-500 group-hover:"
                    />

                    {/* Overlay description */}
                    <div className="absolute inset-0 flex justify-start items-start bg-white/30 bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500 [word-spacing:4px]"></div>
                  </div>

                  {/* Image 2 */}
                  <div className="relative w-full h-[450px] overflow-hidden mb-3 group">
                    {/* Image */}
                    <img
                      src="https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-53ca596e-3d84-4dd1-8fb9-53c83ebc53b5.jpg?w=298&e=webp&cX=349.824200913242&cY=0&cW=580.351598173516&cH=853"
                      alt="Philanthropy event 2"
                      className="w-full h-full object-cover transition duration-500 group-hover:"
                    />
                    {/* Overlay description */}
                    <div className="absolute inset-0 flex justify-start items-start bg-white/30 bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500 [word-spacing:4px]"></div>
                  </div>

                  {/* Image 3 */}
                  <div className="relative w-full h-[450px] overflow-hidden mb-3 group">
                    {/* Image */}
                    <img
                      src="https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-610e2dc9-d97d-4c7e-aae1-f14a11d76a30.jpg?w=632&e=webp&cX=28.53881278538813&cY=0&cW=1442.9223744292237&cH=1000"
                      alt="Philanthropy event 3"
                      className="w-full h-full object-cover transition duration-500 group-hover:"
                    />
                    {/* Overlay description */}
                    <div className="absolute inset-0 flex justify-start items-start bg-white/30 bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500 [word-spacing:4px]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="lifesciences" style={{ textAlign: "left" }}>
            <motion.h1
              animate={controlsLifeSciences}
              initial={{ color: "#D3D3D3" }}
              className="md:text-[5.3rem] leading-none text-5xl py-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
            >
              Awards
            </motion.h1>
          </div>

          <div id="retail" style={{ textAlign: "left" }}>
            <motion.h1
              animate={controlsRetail}
              initial={{ color: "#D3D3D3" }}
              className="md:text-[5.3rem] leading-none text-5xl py-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
            >
              Consultants & Partners
            </motion.h1>
            <ConsultantsAndPartners />
          </div>

          {/* <div id="education" style={{ textAlign: "left" }}>
          <motion.h1
            animate={controlsEducation}
            initial={{ color: "#D3D3D3" }}
            className="md:text-[5.3rem] leading-none text-5xl py-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
          >
            Education
          </motion.h1>
        </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
