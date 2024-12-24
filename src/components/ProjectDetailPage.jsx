import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [youtubeVideoID, setYoutubeVideoID] = useState("");

  useEffect(() => {
    if (!id || !Number.parseInt(id)) navigate("/projects");

    const fetchData = async () => {
      try {
        // Fetch the current project
        const response = await axios.get(`https://api.terminus-group.com/forms/project/${id}`);
        const currentProject = response.data;

        if (currentProject) {
          setProject(currentProject);

          // Fetch all projects
          const allProjectsResponse = await axios.get(`https://api.terminus-group.com/forms/project`);
          const allProjects = allProjectsResponse.data || [];

          // Filter related projects by type
          const related = allProjects.filter(
            (proj) => proj.type === currentProject.type && proj._id !== currentProject._id
          );
          setRelatedProjects(related);
        } else {
          console.error("No project data found.");
        }

        // Extract YouTube video ID if available
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

  if (!project) {
    return <div className="text-center mt-12 font-sans">Loading Project Data...</div>;
  }

  return (
    <div>
      <div className="flex flex-col py-12 xl:px-12 max-w-full mx-10 text-gray-800">
        {/* Top Section: Title, Location, Image */}
        <div>
          <h1 className="text-8xl text-primary-foreground mb-2 tracking-tighter">{project.title}</h1>
          <p className="text-xl text-black mb-20 leading-5 tracking-tighter">{project.location}</p>
          {/* <p className="text-lg text-black mb-5 leading-8">
            Date {new Date(project.createdAt).toLocaleString("default", { month: "long", year: "numeric" })}
          </p> */}
        </div>
        <div className="flex mb-24 max-xl:flex-col max-xl:gap-8">
          {/* Left Section: Image */}
          <div className="flex-1 h-[60vh] flex">
            <img
              src={project.images && project.images[0]}
              alt={`${project.title} main`}
              className="w-full object-cover"
            />
          </div>

          {/* Right Section: Text */}
          <div className="flex-1 flex justify-end">
            <div className="xl:w-[60%] w-full">
              <p className="tracking-tighter text-foreground">
                <Balancer>{project.description || "No description available."}</Balancer>
              </p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3">Status</p>
              <p className="tracking-tighter font-medium">{project.status}</p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3">Address</p>
              <p className="tracking-tighter font-medium">{project.location || "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3">Type</p>
              <p className="tracking-tighter font-medium">{project.type || "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3">Year Of Completion</p>
              <p className="tracking-tighter font-medium">{project.yearOfCompletion || "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3">Build Up Area</p>
              <p className="tracking-tighter font-medium">{project.builtUpArea || "N/A"}</p>

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
        {relatedProjects.length > 0 && (
          <div style={{ padding: "20px" }}>
            <h1 className="text-6xl text-primary-foreground font-bold mb-7">Related Projects</h1>
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] flex-wrap gap-y-16">
              {relatedProjects.map((project) => (
                <div key={project._id} className="overflow-hidden group">
                  <div className="relative w-full h-[400px] overflow-hidden mb-3">
                    <a href={`/projects/${project._id}`} className="relative w-full h-full overflow-hidden">
                      <img
                        src={project.images?.[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:blur-[2px]"
                      />
                      <div className="absolute inset-0 flex justify-top items-top bg-white/30 bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500 [word-spacing:4px]">
                        <div className="p-4">
                          <p className="text-black text-left text-xl !line-clamp-4 !text-ellipsis">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="p-0 bg-white">
                    <h2 className="font-bold text-2xl tracking-tight text-black line-clamp-1">{project.title}</h2>
                    <div>
                      <p className="text-xl text-foreground leading-4 tracking-tighter">{project.location}</p>
                      <p
                        className={cn(
                          "text-xl text-foreground leading-7 tracking-tighter",
                          project.yearOfCompletion ? "" : "opacity-0"
                        )}
                      >
                        {project.yearOfCompletion ?? "0"}
                      </p>
                    </div>
                    <div className="grid gap-2 mt-8">
                      <span className="px-2 py-1 text-sm bg-foreground/20 text-foreground text-center font-bold transition duration-300 ease-in-out hover:bg-primary-foreground hover:text-white">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
