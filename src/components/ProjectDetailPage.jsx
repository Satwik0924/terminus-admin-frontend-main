import { cn } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import Footer from "./Footer";

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [youtubeVideoID, setYoutubeVideoID] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    if (!id || !Number.parseInt(id)) navigate("/projects");

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.terminus-group.com/forms/project/${id}`);
        const currentProject = response.data;

        if (currentProject) {
          setProject(currentProject);

          const allProjectsResponse = await axios.get(`https://api.terminus-group.com/forms/project`);
          const allProjects = allProjectsResponse.data || [];
          const related = allProjects.filter(
            (proj) => proj.type === currentProject.type && proj._id !== currentProject._id
          );
          setRelatedProjects(related);
        }

        const youtubeVideo = new URL(currentProject.youtubeVideoUrl);
        switch (youtubeVideo.hostname) {
          case "www.youtube.com":
            setYoutubeVideoID(youtubeVideo.searchParams.get("v"));
            break;
          case "youtu.be":
            setYoutubeVideoID(youtubeVideo.pathname.slice(1));
            break;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, navigate]);

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  if (!project) {
    return <div className="text-center mt-12 font-sans">Loading Project Data...</div>;
  }

  return (
    <div>
      <div className="flex flex-col py-12 max-w-full text-gray-800">
        <div className="xl:mx-20 mx-10">
          <h1 className="text-8xl text-primary-foreground mb-3 tracking-tighter">{project.title}</h1>
          <p className="text-xl text-black mb-20 leading-5 tracking-tighter">{project.location}</p>
        </div>

        <div className="flex mb-24 max-xl:flex-col max-xl:gap-8 xl:mx-20 mx-10">
          <div className="flex-1 h-[60vh] flex">
            <img
              src={project.images && project.images[0]}
              alt={`${project.title} main`}
              className="w-full object-cover cursor-pointer"
              onClick={() => openModal(project.images && project.images[0])}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <div className="xl:w-[60%] w-full">
              <p className="tracking-tighter text-lg text-black">
                <Balancer>{project.description || "No description available."}</Balancer>
              </p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3 text-lg">Status</p>
              <p className="tracking-tighter font-medium text-lg">{project.status}</p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3 text-lg">Address</p>
              <p className="tracking-tighter font-medium text-lg">{project.location || "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3 text-lg">Type</p>
              <p className="tracking-tighter font-medium text-lg">{project.type || "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3 text-lg">Year Of Completion</p>
              <p className="tracking-tighter font-medium text-lg">{project.yearOfCompletion || "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3 text-lg">Build Up Area</p>
              <p className="tracking-tighter font-medium text-lg">{project.builtUpArea || "N/A"}</p>
            </div>
          </div>
        </div>

        {project.images && project.images.length > 0 && (
          <div className="mt-10 mb-24 space-y-36">
            {project.images.slice(1).map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Additional ${index + 1}`}
                className={cn(
                  "w-full mb-5 object-cover h-[80dvh] object-center cursor-pointer",
                  index === project.images.length - 2 ? "!w-[60vh] ml-auto xl:mr-20 mr-10" : ""
                )}
                onClick={() => openModal(imageUrl)}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <button onClick={closeModal} className="absolute top-5 left-5 text-white text-3xl font-bold">
            &times;
          </button>
          <img src={modalImage} alt="Fullscreen view" className="max-w-full max-h-full" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
