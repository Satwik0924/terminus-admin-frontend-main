
import Footer from "../components/Footer";

import React, { useEffect, useState } from "react";
import SingleProjectPage from "../components/SingleProjectPage";
import axios from "axios";

const App = () => {
 
  return <SingleProjectPage project={project} />;
};

const Projects = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios
      .get("https://terminus-group-backend-1in9.onrender.com/forms/project")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          // Simulating picking the first project for demonstration
          setProject(response.data[0]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
  <SingleProjectPage project={project} />;
      <Footer />
    </>
  );
};

export default Projects;
