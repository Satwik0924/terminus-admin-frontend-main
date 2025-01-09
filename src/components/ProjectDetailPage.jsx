import { cn } from "@/lib/utils";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id || !Number.parseInt(id)) navigate("/projects");

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.terminus-group.com/forms/project/${id}`);
        const currentProject = response.data;

        if (currentProject) {
          setProject(currentProject);

          // Extract YouTube video ID if URL exists
          if (currentProject.youtubeVideoUrl) {
            try {
              const videoUrl = currentProject.youtubeVideoUrl;
              let videoId = "";

              // Handle different YouTube URL formats
              if (videoUrl.includes("youtube.com/watch")) {
                const url = new URL(videoUrl);
                videoId = url.searchParams.get("v");
              } else if (videoUrl.includes("youtu.be/")) {
                videoId = videoUrl.split("youtu.be/")[1];
              } else if (videoUrl.includes("youtube.com/embed/")) {
                videoId = videoUrl.split("youtube.com/embed/")[1];
              }

              // Remove any additional parameters
              videoId = videoId?.split("&")[0];
              setYoutubeVideoID(videoId);
            } catch (error) {
              console.error("Error parsing YouTube URL:", error);
            }
          }

          const allProjectsResponse = await axios.get(`https://api.terminus-group.com/forms/project`);
          const allProjects = allProjectsResponse.data || [];
          const related = allProjects.filter(
            (proj) => proj.type === currentProject.type && proj._id !== currentProject._id
          );
          setRelatedProjects(related);
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

  const EnquiryModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: "",
      phoneNumber: "",
      emailId: "",
      query: "",
    });
    const containerRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-md" ref={containerRef}>
          <h2 className="text-2xl font-bold text-center">Download Brochure</h2>
          <p className="text-xs mb-6 text-center">Please fill out this form to continue to download the brochure</p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name *"
                required
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                name="name"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                className="w-full p-2 border rounded"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                name="phoneNumber"
              />
              <input
                type="email"
                placeholder="Email ID *"
                required
                className="w-full p-2 border rounded"
                value={formData.emailId}
                onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
                name="emailId"
              />
              <textarea
                placeholder="Your Query"
                className="w-full p-2 border rounded"
                value={formData.query}
                onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                name="query"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 text-foreground hover:text-foreground/90">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-foreground/90 text-white rounded hover:bg-primary-foreground"
              >
                {isSubmitting ? "Submitting..." : "Submit & Download"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const processType = (str) => {
    if (str === "life_sciences") {
      return "Life Sciences";
    } else {
      return capitalizeString(str);
    }
  };

  const onSubmit = async (submittedData) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", submittedData.name);
      formData.append("emailId", submittedData.emailId);
      formData.append("phoneNumber", submittedData.phoneNumber);
      formData.append("query", submittedData.query);

      const response = await axios.post("https://api.terminus-group.com/forms/enquiry", formData);

      if (response.status === 201) {
        window.open(project.brochureUrl, "_blank");
        return;
      }

      throw new Error();
    } catch (error) {
      alert("There was an error submitting the form. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setShowEnquiryModal(false);
    }
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
              <p className="tracking-tighter font-medium text-lg">{processType(project.type) || "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3 text-lg">Year Of Completion</p>
              <p className="tracking-tighter font-medium text-lg">{project.yearOfCompletion || "N/A"}</p>
              <p className="font-extrabold mt-5 tracking-tighter !leading-3 text-lg">Built Up Area</p>
              <p className="tracking-tighter font-medium text-lg">{project.builtUpArea || "N/A"}</p>
              {project.brochureUrl && (
                <>
                  <button
                    onClick={() => setShowEnquiryModal(true)}
                    className="inline-block mt-5 mb-8 text-foreground font-bold tracking-tighter text-lg text-center"
                  >
                    Download Brochure
                  </button>
                  {showEnquiryModal && (
                    <EnquiryModal
                      onClose={() => setShowEnquiryModal(false)}
                      onSubmit={(formData) => onSubmit(formData)}
                    />
                  )}
                </>
              )}
              {project.websiteLink && (
                <p>
                  <a
                    href={project.websiteLink}
                    className="text-md font-medium mt-5 py-5 tracking-tighter text-foreground hover:text-primary-foreground"
                  >
                    View more
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
        {/* YouTube Video Section */}
        {project.youtubeVideoUrl && youtubeVideoID && (
          <div className="xl:mx-20 mx-10 mb-24">
            <div className="max-w-full mx-auto">
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeVideoID}`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
        {project.images && project.images.length > 0 && (
          <div className="mt-10 mb-24 space-y-36">
            {project.images.slice(1).map((imageUrl, index) => {
              const isLastImage = index === project.images.slice(1).length - 1;
              return (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Additional ${index + 1}`}
                  className={cn(
                    "w-full mb-5 object-contain h-[80dvh] object-center cursor-pointer",
                    isLastImage ? "object-cover" : ""
                  )}
                  onClick={() => openModal(imageUrl)}
                />
              );
            })}
          </div>
        )}
      </div>
      {relatedProjects.length > 0 && (
        <div className="xl:mx-20 mx-10 py-5">
          <h1 className="text-6xl text-primary-foreground font-bold mb-7">Related Projects</h1>
          <div
            className={`grid gap-6 flex-wrap gap-y-16 ${relatedProjects.length < 3 ? "md:grid-cols-3 grid-cols-1" : "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"}`}
          >
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <button onClick={closeModal} className="absolute top-5 right-5 text-white text-3xl font-bold">
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
