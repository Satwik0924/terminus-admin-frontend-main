import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import DrivenByMission from "./DrivenBy";

const OfficeComponent = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get("https://api.terminus-group.com/forms/team");
        const transformedData = response.data.map((member) => ({
          id: member._id,
          name: member.name,
          role: member.designation,
          image: member.image,
          linkedinUrl: member.linkedinUrl,
        }));
        setTeamData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team data:", error);
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const controlsLine1 = useAnimation();
  const controlsLine2 = useAnimation();
  const controlsLine3 = useAnimation();
  useEffect(() => {
    const handleScroll = () => {
      const heading1 = document.getElementById("heading1");
      const heading2 = document.getElementById("heading2");

      if (heading1) {
        const rect1 = heading1.getBoundingClientRect();
        const isVisible1 = rect1.top >= 0 && rect1.top < window.innerHeight / 2;

        if (isVisible1) {
          controlsLine1.start({
            color: ["#f58220cc", "#F58220"], // Orange gradient
            transition: { duration: 1 },
          });
        } else {
          controlsLine1.start({
            color: "#D3D3D3", // Gray color when out of view
            transition: { duration: 1 },
          });
        }
      }
      if (heading3) {
        const rect3 = heading3.getBoundingClientRect();
        const isVisible1 = rect3.top >= 0 && rect3.top < window.innerHeight / 2;

        if (isVisible1) {
          controlsLine3.start({
            color: ["#f58220cc", "#F58220"], // Orange gradient
            transition: { duration: 1 },
          });
        } else {
          controlsLine3.start({
            color: "#D3D3D3", // Gray color when out of view
            transition: { duration: 1 },
          });
        }
      }

      if (heading2) {
        const rect2 = heading2.getBoundingClientRect();
        const isVisible1 = rect2.top >= 0 && rect2.top < window.innerHeight / 2;

        if (isVisible1) {
          controlsLine2.start({
            color: ["#f58220cc", "#F58220"], // Orange gradient
            transition: { duration: 1 },
          });
        } else {
          controlsLine2.start({
            color: "#D3D3D3", // Gray color when out of view
            transition: { duration: 1 },
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controlsLine1, controlsLine2]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
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
        {/* Top Section */}
        <div id="team" style={{ textAlign: "left" }}>
          <img
            src="https://c-p.rmcdn1.net/6704dad37ea051caab873de5/5089501/Image-6f2f2b02-4bf3-40e7-b6ba-f6a5ddfcafc7.gif"
            alt="Office Scene"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <motion.h1
            id="heading1"
            style={{
              height: "60px",
              width: "100%",
              fontWeight: "500",
              fontSize: "60px",
              margin: "20px 0",
              letterSpacing: "-2px",
              lineHeight: "60px",
              marginBottom: "7px",
            }}
            animate={controlsLine1}
            initial={{ color: "#D3D3D3" }}
          >
            The Finest.
          </motion.h1>
          <p
            style={{
              color: "#727272",
              opacity: "0.5",
              fontSize: "18px",
              letterSpacing: "-0.7px",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            Featuring an established track record of creating luxury,
            <br /> retail and corporate properties by partnering with
            <br /> experts in the engineering and architecture industry
          </p>
          <p
            style={{
              color: "#727272",
              opacity: "0.5",
              fontSize: "18px",
              letterSpacing: "-0.7px",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            Over adecade of delivering projects that are at the
            <br /> forefront of modern design, every time setting a<br /> benchmark in Hyderabad
          </p>
          <a href="#" className="text-lg font-bold mt-11 mb-11  text-foreground hover:text-primary-foreground">
            Hear from our founder chairman
          </a>
        </div>
        <DrivenByMission />
        {/* Team Section */}
        <div id="philanthropy" style={{ textAlign: "left" }}>
          <motion.h1
            id="heading2"
            style={{
              height: "60px",
              width: "100%",
              fontWeight: "500",
              fontSize: "60px",
              margin: "20px 0",
              letterSpacing: "-2px",
              lineHeight: "60px",
              marginBottom: "7px",
            }}
            animate={controlsLine2}
            initial={{ color: "#D3D3D3" }}
          >
            The Team
          </motion.h1>
          <img
            src="https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-82fc00d4-be74-4e76-887a-d79cdf4ee721.jpg"
            alt="The Team"
            style={{
              width: "100%",
              height: "auto",
              margin: "20px 0",
            }}
          />
          <p
            style={{
              color: "#727272",
              opacity: "0.5",
              fontSize: "18px",
              letterSpacing: "-0.7px",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            We believe that you can achieve the best product if you
            <br /> have the best people in your team.
          </p>
          <p
            style={{
              color: "#727272",
              opacity: "0.5",
              fontSize: "18px",
              letterSpacing: "-0.7px",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            We have a diverse team from all fields of expertise in
            <br /> architecture, legal, finance and facility management.
            <br /> Together as a team, we have a wealth of experience
            <br /> and skills to incorporate and bring the best-in-class
            <br /> architectural wonders!
          </p>
          <p
            style={{
              color: "#727272",
              opacity: "0.5",
              fontSize: "18px",
              letterSpacing: "-0.7px",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            Each of our team members is innovative, tech-driven
            <br /> and well-trained to contribute skilfully to our diverse
            <br /> range of projects.
          </p>
          <p
            style={{
              color: "#727272",
              opacity: "0.5",
              fontSize: "18px",
              letterSpacing: "-0.7px",
              lineHeight: "1.6",
              marginBottom: "20px",
            }}
          >
            A talented group with a shared vision of delivering
            <br /> consistently great results for our clients, we can proudly
            <br /> say teamwork has always made planning easier, targets
            <br /> achievable and quality uncompromisable.
          </p>
        </div>

        {/* Team Members Section */}
        <div id="news">
          <motion.h1
            id="heading3"
            style={{
              height: "60px",
              width: "100%",
              fontWeight: "500",
              fontSize: "48px",

              letterSpacing: "-2px",
              lineHeight: "60px",
              marginBottom: "7px",
            }}
            animate={controlsLine3}
            initial={{ color: "#D3D3D3" }}
          >
            Leadership
          </motion.h1>
          {loading ? (
            <p className="text-gray-600 text-lg">Loading team data...</p>
          ) : (
            <div className="flex flex-wrap gap-5 justify-start">
              {teamData.map((member) => (
                <div key={member.id} className="w-1/3 sm:w-1/4 text-left mb-5 relative group">
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80"
                  >
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-64 object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-80"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-white/30 bg-opacity-50 flex opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="text-black mt-3 ml-3 text-lg text-left align-top font-medium">View More</span>
                      </div>
                    </div>
                  </a>
                  <p className="font-semibold mt-2 text-xl tracking-tight text-black">{member.name}</p>
                  <p className="text-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeComponent;
