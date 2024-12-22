import ContactSection from "../components/ContactUs";
import Footer from "../components/Footer";
import HorizontalScrollCarousel from "../components/HorizontalScroll";
import ProjectsGrid from "../components/ProjectGrid";
import Carousel from "../components/StartCaraousel";
import StatsSection from "../components/StatsSection";

const Home = () => {
  return (
    <>
      <Carousel />
      <StatsSection />
      <ProjectsGrid />
      <HorizontalScrollCarousel />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
