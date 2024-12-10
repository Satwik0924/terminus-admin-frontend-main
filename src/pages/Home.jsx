import React from "react";
import ContactSection from "../components/ContactUs";
import Footer from "../components/Footer";
import HorizontalScrollCarousel from "../components/HorizontalScroll";
import ProjectsGrid from "../components/ProjectGrid";
import StatsSection from "../components/StatsSection";
import ConsultantsAndPartners from "../components/Consultants";
import DrivenByMission from "../components/DrivenBy";
import Carousel from "../components/StartCaraousel";

const Home = () => {
  return (
    <>
      <Carousel />
      <StatsSection />
      <ProjectsGrid />
      <ConsultantsAndPartners />
      <DrivenByMission />
      <HorizontalScrollCarousel />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
