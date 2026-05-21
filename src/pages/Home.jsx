import { Helmet } from "react-helmet-async";
import ContactSection from "../components/ContactUs";
import Footer from "../components/Footer";
import ProjectsGrid from "../components/ProjectGrid";
import Carousel from "../components/StartCaraousel";
import StatsSection from "../components/StatsSection";
import Milestones from "@/components/Milestones";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Residential and commercial builders in Hyderabad | Terminus Group</title>
        <meta
          name="description"
          content="Build your future with Terminus Group - creating premium residential and commercial spaces in Hyderabad with modern design, quality construction, and lasting value."
        />
        <link rel="canonical" href="https://terminus-group.com/" />
      </Helmet>
      <Carousel />
      <StatsSection />
      <ProjectsGrid />
      {/* <HorizontalScrollCarousel /> */}
      <Milestones />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
