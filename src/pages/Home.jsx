import ContactSection from "../components/ContactUs";
import Footer from "../components/Footer";
import ProjectsGrid from "../components/ProjectGrid";
import Carousel from "../components/StartCaraousel";
import StatsSection from "../components/StatsSection";
import Milestones from "@/components/Milestones";

const Home = () => {
  return (
    <>
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
