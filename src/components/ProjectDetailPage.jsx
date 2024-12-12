import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [youtubeVideoID, setYoutubeVideoID] = useState("");

  useEffect(() => {
    if (!id || !Number.parseInt(id)) navigate("/projects");
    const handleDownload = () => {
      const link = document.createElement("a");
      link.href = project.brochureUrl; // The URL of the PDF
      link.download = "brochure.pdf"; // You can set a custom filename here
      link.click(); // Programmatically click the link to start the download
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://terminus-group-backend-1in9.onrender.com/forms/project/${id}`);
        if (response.data) setProject(response.data);
        else return;

        const youtubeVideo = new URL(response.data.youtubeVideoUrl);

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
  }, []);

  if (!project) {
    return <div className="text-center mt-12 font-sans">Loading Project Data...</div>;
  }

  return (
    <div>
      <div className="flex flex-col p-12 max-w-full mx-10  text-gray-800">
        {/* Top Section: Title, Location, Image */}
        <div>
          <h1 className="text-7xl font-bold text-orange-500 mb-2">{project.title}</h1>
          <p className="text-2xl text-black mb-2 leading-5">Location {project.location}</p>
          <p className="text-lg text-black mb-5 leading-8">
            Date {new Date(project.createdAt).toLocaleString("default", { month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex">
          {/* Left Section: Image */}
          <div className="w-2/3 pr-10">
            <img
              src={project.images && project.images[0]}
              alt={`${project.title} main`}
              className="w-full h-auto  object-contain"
            />
          </div>

          {/* Right Section: Text */}
          <div className="w-1/3 pl-20 flex flex-col justify-start">
            <p className="leading-10 text-xl tracking-tighter text-gray-600">
              {project.description || (
                <>
                  Short Description Goes Here
                  <br />
                  Most people are dismayed if deprived of their pleasures. The right course belongs to him who relishes
                  even the passing away of the reason for his joy and is not bitter. — Pascal
                </>
              )}
            </p>
            <p className="font-extrabold mt-5 tracking-tighter">Status</p>
            <p>{project.status}</p>
            <p className="font-extrabold mt-5 tracking-tighter">Address</p>
            <p>{project.location}</p>
            <p className="font-extrabold mt-5 tracking-tighter">Type</p>
            <p>{project.tags ? project.tags.join(", ") : "N/A"}</p>
            <p className="font-extrabold mt-5 tracking-tighter">Year of Completion</p>
            <p>{project.yearOfCompletion || "N/A"}</p>
            <p className="font-extrabold mt-5 tracking-tighter">Architect</p>
            <p>{project.architect || "N/A"}</p>
            <p className="font-extrabold mt-5 tracking-tighter">Landscape Architect</p>
            <p>{project.landscapeArchitect || "N/A"}</p>
            {project.brochureUrl && (
              <a
                href={project.brochureUrl}
                className="inline-block mt-5 px-6 py-2 bg-orange-500 text-white text-center "
                target="_blank"
                rel="noopener noreferrer"
                download // This triggers the download
              >
                Download Brochure
              </a>
            )}
          </div>
        </div>

        {/* Additional Images Section */}
        {project.images && project.images.length > 0 && (
          <div className="mt-10">
            {project.images.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Additional ${index + 1}`} className="w-full mb-5  object-contain" />
            ))}
          </div>
        )}

        {/* YouTube Video Section */}
        {project.youtubeVideoUrl && youtubeVideoID.length > 0 && (
          <div className="mt-10">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoID}`}
              title="Project Video"
              className="w-full h-[450px] border-none"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
