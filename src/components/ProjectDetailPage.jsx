import axios from "axios";
import { useEffect, useState } from "react";
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
        const response = await axios.get(`https://api.terminus-group.com/forms/project/${id}`);
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
      <div className="flex flex-col p-12 max-w-full mx-10 text-gray-800">
        {/* Top Section: Title, Location, Image */}
        <div>
          <h1 className="text-8xl text-primary-foreground mb-2 tracking-tighter">{project.title}</h1>
          <p className="text-xl text-black mb-20 leading-5 tracking-tighter">{project.location}</p>
          {/* <p className="text-lg text-black mb-5 leading-8">
            Date {new Date(project.createdAt).toLocaleString("default", { month: "long", year: "numeric" })}
          </p> */}
        </div>
        <div className="flex mb-24">
          {/* Left Section: Image */}
          <div className="flex-1 h-[80dvh] overflow-hidden">
            <img
              src={project.images && project.images[0]}
              alt={`${project.title} main`}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Right Section: Text */}
          <div className="flex-1 flex justify-end">
            <div className="w-[65%]">
              <p className="text-lg tracking-tighter text-foreground !leading-snug">
                {project.description || "No description available."}
              </p>
              <p className="font-extrabold mt-5 tracking-tighter text-lg !leading-3">Status</p>
              <p className="text-lg tracking-tighter">{project.status}</p>
              <p className="font-extrabold mt-5 tracking-tighter text-lg !leading-3">Address</p>
              <p className="text-lg tracking-tighter">{project.location || "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter text-lg !leading-3">Type</p>
              <p className="text-lg tracking-tighter">{project.tags ? project.tags.join(", ") : "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter text-lg !leading-3">Year of Completion</p>
              <p className="text-lg tracking-tighter">{project.yearOfCompletion || "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter text-lg !leading-3">Architect</p>
              <p className="text-lg tracking-tighter">{project.architect || "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter text-lg !leading-3">Landscape Architect</p>
              <p className="text-lg tracking-tighter">{project.landscapeArchitect || "N/A"}</p>
              {project.brochureUrl && (
                <a
                  href={project.brochureUrl}
                  className="inline-block mt-5 text-foreground font-bold tracking-tighter text-lg text-center "
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download Brochure
                </a>
              )}
            </div>
          </div>
        </div>

        {/* YouTube Video Section */}
        {project.youtubeVideoUrl && youtubeVideoID.length > 0 && (
          <div className="mt-10 mb-24">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoID}`}
              title="Project Video"
              className="w-full h-[80dvh] border-none"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        )}

        {/* Additional Images Section */}
        {project.images && project.images.length > 0 && (
          <div className="mt-10 mb-24 space-y-36">
            {project.images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Additional ${index + 1}`}
                className="w-full mb-5 object-cover h-[80dvh] object-center"
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
