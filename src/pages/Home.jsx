import React from "react";
import Footer from "../components/Footer";
import StatsSection from "../components/StatsSection";
import ContactSection from "../components/ContactUs";
import ProjectsGrid from "../components/ProjectGrid";
import HorizontalScrollCarousel from "../components/HorizontalScroll";


import Carousel from "../components/StartCaraousel";
import ConsultantsAndPartners from "../components/Consultants";
import DrivenByMission from "../components/DrivenBy";

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
