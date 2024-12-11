import React from "react";
import ConsultantsAndPartners from "../components/Consultants";
import ContactSection from "../components/ContactUs";
import DrivenByMission from "../components/DrivenBy";
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
      <DrivenByMission />
      <HorizontalScrollCarousel />
      <ConsultantsAndPartners />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
