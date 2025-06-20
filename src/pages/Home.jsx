import ContactSection from "../components/ContactUs";
import Footer from "../components/Footer";
import ProjectsGrid from "../components/ProjectGrid";
import Carousel from "../components/StartCaraousel";
import StatsSection from "../components/StatsSection";
import Milestones from "@/components/Milestones";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
    
   <Helmet>
        <title>Terminus Group : Best residential and commercial projects in Hyderabad</title>
        <meta name="description" content="Terminus Group delivers premium residential and commercial projects with a focus on quality, placing it among the best builders and top developers in Hyderabad." />
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
