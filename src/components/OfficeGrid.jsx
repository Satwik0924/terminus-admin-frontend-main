import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
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
        <div id="team" style={{ textAlign: "left", marginBottom: "3rem" }}>
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
            // style={{
            //   height: "60px",
            //   width: "100%",
            //   fontWeight: "500",
            //   fontSize: "5rem",
            //   letterSpacing: "-2px",
            //   lineHeight: "60px",
            //   marginBottom: "1rem",
            // }}
            className="text-8xl tracking-tighter mt-16 mb-5"
            animate={controlsLine1}
            initial={{ color: "#D3D3D3" }}
          >
            The Finest.
          </motion.h1>
          <p
            // style={{
            //   color: "#727272",
            //   opacity: "0.5",
            //   fontSize: "18px",
            //   letterSpacing: "-0.7px",
            //   lineHeight: "1.6",
            //   marginBottom: "20px",
            //   maxWidth: "35rem",
            // }}
            className="text-foreground/70 text-lg tracking-tighter !leading-snug mb-5 max-w-xl"
          >
            <Balancer>
              Terminus aims to create a design-led future of cities, with visionary projects across India.
              <br />
              <br /> By focusing on the evolving needs of our clients and communities, we create spaces that foster
              growth and productivity, advancing individual and societal goals through innovation and collaboration with
              the finest designers and consultants. <br />
              <br /> We are the builders of a new era, with a proven track record across a diverse set of properties,
              operating across business verticals such as residential, commercial, mixed-use buildings, hospitality,
              healthcare, life sciences, and education. Our services across the value chain include investment,
              development, and asset and facility management.
            </Balancer>
          </p>
          {/* <a
            href="#"
            className="text-lg font-bold mt-11 !text-foreground/70 tracking-tighter hover:!text-primary-foreground"
          >
            Hear from our Founder Chairman
          </a> */}
        </div>
        <DrivenByMission />
        {/* Team Section */}
        <div id="residential" style={{ textAlign: "left" }}>
          <motion.h1
            id="heading2"
            style={{
              height: "60px",
              width: "100%",
              fontWeight: "500",
              fontSize: "60px",
              marginTop: "3rem",
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
          <div className="max-w-lg">
            <p
              //   style={{
              //     color: "#727272",
              //     opacity: "0.8",
              //     fontSize: "18px",
              //     letterSpacing: "-0.7px",
              //     lineHeight: "1.6",
              //     marginBottom: "20px",
              //   }}
              className="text-foreground/70 text-lg tracking-tighter leading-snug mb-5"
            >
              We believe that you can achieve the best product if you have the best people in your team.
            </p>
            <p
              //   style={{
              //     color: "#727272",
              //     opacity: "0.8",
              //     fontSize: "18px",
              //     letterSpacing: "-0.7px",
              //     lineHeight: "1.6",
              //     marginBottom: "20px",
              //   }}
              className="text-foreground/70 text-lg tracking-tighter leading-snug mb-5"
            >
              We have a diverse team from all fields of expertise in architecture, legal, finance and facility
              management. Together as a team, we have a wealth of experience and skills to incorporate and bring the
              best-in-class architectural wonders!
            </p>
            <p
              //   style={{
              //     color: "#727272",
              //     opacity: "0.8",
              //     fontSize: "18px",
              //     letterSpacing: "-0.7px",
              //     lineHeight: "1.6",
              //     marginBottom: "20px",
              //   }}
              className="text-foreground/70 text-lg tracking-tighter leading-snug mb-5"
            >
              Each of our team members is innovative, tech-driven and well-trained to contribute skilfully to our
              diverse range of projects.
            </p>
            <p
              //   style={{
              //     color: "#727272",
              //     opacity: "0.8",
              //     fontSize: "18px",
              //     letterSpacing: "-0.7px",
              //     lineHeight: "1.6",
              //     marginBottom: "20px",
              //   }}
              className="text-foreground/70 text-lg tracking-tighter leading-snug mb-5"
            >
              A talented group with a shared vision of delivering consistently great results for our clients, we can
              proudly say teamwork has always made planning easier, targets achievable and quality uncompromisable.
            </p>
          </div>
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
            <p className="text-foreground/70 text-lg">Getting the team ready...</p>
          ) : (
            <div className="grid grid-cols-4 max-[1440px]:grid-cols-3 max-xl:grid-cols-2 max-[569px]:grid-cols-1 gap-6">
              {teamData.map((member) => (
                <div key={member.id} className="h-full w-full text-left mb-5 relative group">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative h-[400px] overflow-hidden w-full">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover object-center" />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex justify-top items-top bg-white/50 bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500 [word-spacing:4px]">
                        <div className="p-4">
                          <p className="text-black text-left text-lg font-semibold">View More</p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <p className="font-semibold mt-2 text-xl tracking-tight text-black">{member.name}</p>
                  <p className="text-foreground !leading-tight">{member.role}</p>
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
