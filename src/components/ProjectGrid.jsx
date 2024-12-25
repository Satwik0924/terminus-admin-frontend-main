import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Balancer from "react-wrap-balancer"; // Ensure react-wrap-balancer is imported

const ProjectsGrid = () => {
  const headingAnimation = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const heading = document.getElementById("heading");
      if (heading) {
        const rect = heading.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top < window.innerHeight / 2;

        if (isVisible) {
          headingAnimation.start({
            color: "#F58220",
            transition: { duration: 0.7 },
          });
        } else {
          headingAnimation.start({
            color: "#A0A0A0",
            transition: { duration: 0.7 },
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headingAnimation]);

  const projects = [
    {
      title: "Commercial",
      image:
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-e1aeea35-eb19-4411-bf06-ea474d8dcd48.jpg?w=421&e=webp&cX=501.04166666666663&cY=0&cW=1447.9166666666667&cH=3500",
    },
    {
      title: "Residential",
      image:
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-c602d24d-ca60-4276-9563-169d82db46a8.jpg?w=421&e=webp&cX=523.3392857142858&cY=0&cW=1345.3214285714284&cH=3252",
    },
    {
      title: "Hospitality",
      image:
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-f972e3e1-d950-4d85-8d21-37b0b46a4771.jpg?w=421&e=webp&cX=463.5610119047619&cY=0&cW=352.8779761904762&cH=853",
    },
    {
      title: "Life Sciences",
      image:
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068970/image-a10a7f2b-0283-4585-9525-c09777fe2899.jpg?w=559&e=webp&cX=811&cY=0&cW=846&cH=1920",
    },
    {
      title: "Retail",
      image:
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-94b06840-2b4a-46c5-855c-877b82cc57b6.jpg?w=421&e=webp&cX=379.28571428571433&cY=0&cW=1191.4285714285713&cH=2880",
    },
    {
      title: "Education",
      image:
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-ff9ab9c6-5d2b-4940-91c6-1b8dce7fb6a5.jpg?w=421&e=webp&cX=1006&cY=0&cW=794&cH=1920",
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center h-auto lg:py-40 py-20 w-full" id="explore-projects">
      <div className="sm:w-[90%] w-full">
        {/* Heading */}
        <motion.h1
          id="heading"
          animate={headingAnimation}
          initial={{ color: "#A0A0A0" }}
          className="md:text-[5.3rem] leading-none text-5xl mb-20 font-medium text-[#A0A0A0] text-left tracking-tighter"
        >
          <Balancer>Explore Our Projects</Balancer>
        </motion.h1>
        {/* Responsive Grid */}

        <div className="flex justify-center items-center max-sm:px-10">
          <div className="grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`w-full h-[60dvh] max-sm:w-full overflow-hidden relative hover:scale-[1.03] transition-transform duration-500 ease-in-out bg-white flex flex-col justify-center`}
              >
                <div className="flex-grow">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-between items-center">
                  <h2 className="text-white text-3xl font-bold">{project.title}</h2>

                  {/* "View Projects" at Bottom Left */}
                  <Link
                    to="/projects"
                    className="text-primary-foreground hover:text-white transition-colors text-lg mx-auto gap-2 font-medium flex items-center"
                  >
                    View Projects
                    <ArrowRight className="stroke-white size-6" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
