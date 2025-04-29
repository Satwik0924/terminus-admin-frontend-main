import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import NewsMedia from "../components/NewsAndMedia";

const News = () => {
  const controlsNews = useAnimation();
  const controlsAwards = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "news-media", controls: controlsNews },
        { id: "awards", controls: controlsAwards },
      ];

      sections.forEach(({ id, controls }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.top < window.innerHeight / 2;

          if (isVisible) {
            controls.start({
              color: "#F58220",
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
    };
  }, [controlsNews, controlsAwards]);

  return (
    <>
      <Helmet>
        <title>Terminus Group News | Latest Updates, Media Releases & Industry Insights</title>
        <meta
          name="description"
          content="Stay informed with the latest press releases and news updates from Terminus Group, covering our recent projects, partnerships, and industry insights."
        />
      </Helmet>
      <div id="news-media" style={{ textAlign: "left", padding: "2rem 1rem" }}>
        <motion.h1
          animate={controlsNews}
          initial={{ color: "#D3D3D3" }}
          className="md:text-[5.3rem] leading-none text-5xl py-10 px-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
        >
          News & Media
        </motion.h1>
        <NewsMedia className="sm:ml-16 max-sm:mx-6" />
      </div>

      {/* <div id="awards" style={{ textAlign: "left", padding: "2rem 1rem" }}>
        <motion.h1
          animate={controlsAwards}
          initial={{ color: "#D3D3D3" }}
          className="md:text-[5.3rem] leading-none text-5xl px-10  py-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
        >
          Awards
        </motion.h1>
        <AwardsComponent className="ml-16" />
      </div> */}

      <Footer />
    </>
  );
};

export default News;
