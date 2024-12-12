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
    <div className="font-sans py-20 lg:py-20 w-full flex items-center justify-center">
      <div className="w-[95%] lg:pl-10">
        <motion.h1
          id="missionTitle"
          animate={controlsTitle}
          initial={{ color: "#D3D3D3" }}
          className="transition-colors duration-900 ease-in-out md:text-[5.3rem] leading-none text-5xl mb-10 text-[#A0A0A0] text-left tracking-tight"
        >
          Driven by a Mission
        </motion.h1>
        <div className="font-sans items-center">
          <div className="flex items-start mb-28 gap-6 flex-col-reverse lg:flex-row max-lg:text-left max-lg:items-center">
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
          </div>

          {/* Second Section */}
          <div className="flex items-start mb-28 gap-6 flex-col-reverse lg:flex-row max-lg:text-left max-lg:items-center">
            {/* Text Content */}
            <div className="flex-1 text-lg xl:text-2xl text-[rgba(114,114,114,0.6)] !leading-7 tracking-tighter">
              <p>
                <strong>
                  <strong>Vinay Solipuram</strong>
                </strong>{" "}
                graduated from The Parsons School of Design with a degree in Strategic Design and Management, along with
                a minor in Fashion Communication. Having grown up between India and the United States, he brings a
                unique blend of cultural and educational experiences to his work. Vinay has designed both residential
                and commercial projects in New York and Hyderabad, incorporating a fusion of East and West in his
                designs. His approach often integrates Indian elements, whether through art, furniture, or collaboration
                with local artisans. With experience across various industries, Vinay's focus lies at the intersection
                of creative expression and business models.
              </p>
              {/* <p className="text-[rgba(114,114,114,0.6)] font-bold mt-5 cursor-pointer">Read more</p> */}
            </div>

            <div className="flex-[2] w-full h-full max-w-full">
              <div className="relative w-full h-full" style={{ paddingBottom: "56.25%" }}>
                {" "}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/SQPGpfRQ4Q4?si=Tn8DrTzXoyO1usGt"
                  title="YouTube video"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-primary-foreground mt-3 leading-tight text-3xl font-bold">A vision of the future</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivenByMission;
