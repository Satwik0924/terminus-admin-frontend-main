import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import BlogsList from "../components/BlogsList";

const Blogs = () => {
  const controlsBlogs = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [{ id: "blogs-section", controls: controlsBlogs }];

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
  }, [controlsBlogs]);

  return (
    <>
      <Helmet>
        <title>Terminus Group Blogs | Insights, Ideas & Industry Expertise</title>
        <meta
          name="description"
          content="Explore insights and expert perspectives from Terminus Group through our blog posts covering architecture, design, sustainability, and industry trends."
        />
      </Helmet>
      <div id="blogs-section" style={{ textAlign: "left", padding: "2rem 1rem" }}>
        <motion.h1
          animate={controlsBlogs}
          initial={{ color: "#D3D3D3" }}
          className="md:text-[5.3rem] leading-none text-5xl py-10 px-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
        >
          Blogs
        </motion.h1>
        <BlogsList className="sm:ml-16 max-sm:mx-6" />
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
