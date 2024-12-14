import React from "react";
import Footer from "../components/Footer";
import OfficeComponent from "../components/OfficeGrid";
import NewsMedia from "../components/NewsAndMedia";
import AwardsComponent from "../components/Awards";

const About = () => {
  return (
    <>
      <OfficeComponent />
      <NewsMedia />
      <AwardsComponent />
      <Footer />
    </>
  );
};

export default About;
