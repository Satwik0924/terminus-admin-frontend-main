import { SERVER_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const ProjectRedirect = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/forms/project`);
        const projects = response.data;
        const project = projects.find((p) => p._id === id);

        if (project?.slug) {
          window.location.replace(`/projects/${project.slug}`);
        } else {
          window.location.replace("/projects");
        }
      } catch (error) {
        console.error("Error redirecting:", error);
        window.location.replace("/projects");
      }
    };

    fetchAndRedirect();
  }, [id]);

  return <div className="h-screen w-full flex justify-center items-center">Redirecting...</div>;
};
