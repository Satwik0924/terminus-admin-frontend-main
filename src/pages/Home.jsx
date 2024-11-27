import React from "react";
import Footer from "../components/Footer";
import StatsSection from "../components/StatsSection";
import ContactSection from "../components/ContactUs";
import ProjectsGrid from "../components/ProjectGrid";
import HorizontalScrollCarousel from "../components/HorizontalScroll";
import OfficeComponent from "../components/OfficeGrid";
import NewsMedia from "../components/NewsAndMedia";
import Carousel from "../components/StartCaraousel";
import ConsultantsAndPartners from "../components/Consultants";
const Home = () => {
  return <div>
  
    <Carousel />
    <StatsSection />
    <HorizontalScrollCarousel />
    <ProjectsGrid />
    <OfficeComponent />
    <ConsultantsAndPartners />
    <NewsMedia />
    <ContactSection />
    <Footer />
  
  </div>;
};

export default Home;
