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
            color: ["#f58220cc", "#F58220"], // Gradient animation
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

  return (
    <div className="font-sans w-full flex items-left justify-left">
      <div className="w-full items-left justify-left">
        <motion.h1
          id="missionTitle"
          animate={controlsTitle}
          initial={{ color: "#D3D3D3" }}
          className="transition-colors duration-900 ease-in-out md:text-[5.3rem] leading-none text-5xl mb-10 text-[#A0A0A0] text-left tracking-tight"
        >
          Driven by a Mission
        </motion.h1>

        {/* <div className="flex items-start mb-28 gap-6 flex-col-reverse lg:flex-row max-lg:text-left max-lg:items-center">
            <div className="flex-1 text-lg xl:text-2xl text-[rgba(114,114,114,0.6)] !leading-7 tracking-tighter">
              <p>
                <strong>Mr. S.P. Reddy</strong> is a successful entrepreneur, active philanthropist, and investor whose
                experience spans across the USA and India in domains as diverse as Information Technology, Federal
                Government, and Real Estate Development.
              </p>
              <p className="text-[rgba(114,114,114,0.6)] font-bold mt-5 cursor-pointer">Read more</p>
            </div>

            <div className="flex-[2] w-full h-full">
              <div className="relative w-full h-full" style={{ paddingBottom: "56.25%" }}>
                {" "}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/SQPGpfRQ4Q4?si=Tn8DrTzXoyO1usGt" // Replace with your video URL
                  title="YouTube video"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-primary-foreground mt-3 leading-tight text-3xl font-bold">The Founder Chairman</p>
            </div>
          </div> */}

        {/* Second Section */}
        {/* <div className="flex items-start mb-28 gap-6 flex-col-reverse lg:flex-row max-lg:text-left max-lg:items-center">
            {/* Text Content */}

        <div className="w-full">
          <img
            src="https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-f38d4117-aff3-479c-8b59-fcc5ebdc66db.jpg?w=1903&e=webp&cX=41&cY=3337&cW=5222&cH=3084"
            alt="Founder Chairman Portrait"
            className="w-[95%] h-auto mb-2"
          />

          <h1 className="text-primary-foreground text-3xl font-bold mb-6">The Founder Chairman</h1>

          <div className="space-y-3 w-2/3 !text-foreground/70">
            <p className="leading-relaxed tracking-tighter">
              <strong>Mr. S.P. Reddy</strong> is an accomplished entrepreneur, philanthropist, and investor with a
              diverse career spanning Information Technology, Federal Government, and Real Estate Development.
            </p>

            <p className="leading-relaxed tracking-tighter">
              In 1995, Mr. Reddy founded enGenius Consulting Group in Atlanta, USA, growing it into a global
              organization with over 250 employees across 30 U.S. locations and five countries. His leadership has been
              pivotal in the company's success for over 25 years.
            </p>

            <p className="leading-relaxed tracking-tighter">
              Relocating to India in 2007, Mr. Reddy established Terminus Group, a leading real estate development firm
              in Hyderabad. Under his guidance, the company has completed over six million square feet of construction,
              with an additional ten million square feet under development. Terminus operates across multiple sectors,
              including Hospitality, Healthcare, Life Sciences, Commercial, Retail and Education.
            </p>

            <p className="leading-relaxed tracking-tighter !mb-5">
              In addition to his business accomplishments, Mr. Reddy is deeply committed to philanthropy, spearheading
              initiatives like IMPACT, Sparsh, and the AIG Rural Outreach Program. His contributions to both industry
              and society have earned him numerous accolades.
            </p>

            <a
              href="#"
              className="text-md font-extrabold tracking-tighter text-foreground/70 hover:text-primary-foreground"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivenByMission;
