import { SERVER_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import Footer from "./Footer";
// OLD: Static meta tags file (commented out - now using CMS data)
// import { getProjectMetaTags } from "../data/projectMetaTags";

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [youtubeVideoID, setYoutubeVideoID] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inlineFormData, setInlineFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isInlineSubmitting, setIsInlineSubmitting] = useState(false);
  const [inlineSuccess, setInlineSuccess] = useState(false);
  const [landscapeImage, setLandscapeImage] = useState(null);

  useEffect(() => {
    if (!slug) navigate("/projects");

    const fetchData = async () => {
      try {
        const [response, allProjectsResult] = await Promise.all([
          axios.get(`${SERVER_URL}/forms/project/${slug}`, {
            maxRedirects: 5, // Allow following redirects
            validateStatus: (status) => status < 500, // Don't throw on 3xx redirects
          }),
          axios.get(`${SERVER_URL}/forms/project`).catch((relatedError) => {
            console.error("Error fetching related projects:", relatedError);
            return null;
          }),
        ]);

        // If we get a 404, the project doesn't exist
        if (response.status === 404) {
          console.error("Project not found");
          navigate("/projects");
          return;
        }

        const currentProject = response.data;

        if (currentProject) {
          // Check if the slug in the URL is different from the project's current slug
          // This happens when an old slug was used and we got redirected
          if (currentProject.slug && currentProject.slug !== slug) {
            // Update the URL without reloading the page
            window.history.replaceState(null, "", `/projects/${currentProject.slug}`);
          }

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

          if (allProjectsResult) {
            const allProjectsData = allProjectsResult.data;
            // Handle different API response structures
            const allProjects = Array.isArray(allProjectsData) ? allProjectsData : allProjectsData?.data || [];
            const related = allProjects.filter(
              (proj) => proj.type === currentProject.type && proj._id !== currentProject._id
            );
            setRelatedProjects(related);
          } else {
            setRelatedProjects([]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug, navigate]);

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
                type="text"
                placeholder="Phone Number *"
                required
                className="w-full p-2 border rounded"
                value={formData.phoneNumber}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setFormData({ ...formData, phoneNumber: numericValue });
                }}
                pattern="[0-9]+"
                title="Please enter a valid phone number (numbers only)"
                maxLength={10}
                minLength={10}
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
    if (!str || typeof str !== "string") return "N/A";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const processType = (str) => {
    if (!str || typeof str !== "string") return "N/A";
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
      formData.append("projectName", project.title);
      formData.append("projectType", project.type);
      formData.append("name", submittedData.name);
      formData.append("emailId", submittedData.emailId);
      formData.append("phoneNumber", submittedData.phoneNumber);
      formData.append("query", submittedData.query);

      const response = await axios.post(`${SERVER_URL}/forms/enquiry`, formData);

      if (response.status === 201) {
        if (slug === "the-line-apartments-narsingi") {
          window.open("/LINE_Brochure.pdf", "_blank");
          window.location.href = "https://info.terminus-group.com/theline/thank-you.html";
        } else if (slug === "the-pointe-villas-gollur") {
          window.open("/assets/The_Pointe_Mini_brochure.pdf", "_blank");
        } else {
          window.open(project.brochureUrl, "_blank");
        }
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

  const handleInlineSubmit = async (e) => {
    e.preventDefault();
    setIsInlineSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("projectName", project.title);
      fd.append("projectType", project.type);
      fd.append("name", inlineFormData.name);
      fd.append("emailId", inlineFormData.email);
      fd.append("phoneNumber", inlineFormData.phone);
      fd.append("query", inlineFormData.message);
      const response = await axios.post(`${SERVER_URL}/forms/enquiry`, fd);
      if (response.status === 201) {
        setInlineFormData({ name: "", email: "", phone: "", message: "" });
        setInlineSuccess(true);
        setTimeout(() => setInlineSuccess(false), 4000);
      }
    } catch (err) {
      toast.error("Failed to send. Please try again later.", { duration: 1500 });
    } finally {
      setIsInlineSubmitting(false);
    }
  };

  const inlineFormSlugs = ["the-pointe-villas-gollur", "the-line-apartments-narsingi"];

  useEffect(() => {
    if (!project?.images || !inlineFormSlugs.includes(slug)) {
      setLandscapeImage(null);
      return;
    }
    setLandscapeImage(project.images[0]);
  }, [project, slug]);
  const inlineFormHeading =
    slug === "the-pointe-villas-gollur"
      ? "Enquire About The Pointe Villas"
      : slug === "the-line-apartments-narsingi"
        ? "Enquire About The Line Apartments"
        : "";

  if (!project) {
    return <div className="text-center mt-12 font-sans">Loading Project Data...</div>;
  }

  // OLD: Get meta tags from static file (commented out)
  // const projectMeta = getProjectMetaTags(slug);
  // const metaTitle = projectMeta.metaTitle || `${project.title || "Project"} | Terminus Group`;
  // const metaDescription =
  //   projectMeta.metaDescription ||
  //   project.description ||
  //   `Discover ${project.title || "this project"} by Terminus Group - premium real estate project in Hyderabad.`;

  // NEW: Use meta title and description from CMS (project data)
  const metaTitle = project.metaTitle || `${project.title || "Project"} | Terminus Group`;
  const metaDescription =
    project.metaDescription ||
    project.description ||
    `Discover ${project.title || "this project"} by Terminus Group - premium real estate project in Hyderabad.`;
  const metaImage = project.images?.[0] || "https://terminus-group.com/assets/og-image-default.jpg";
  const canonicalUrl = `https://terminus-group.com/projects/${project.slug || slug}`;

  return (
    <div>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:site_name" content="Terminus Group" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />

        {/* Additional SEO Meta Tags */}
        <meta
          name="keywords"
          content={`${project.title || "project"}, terminus group, hyderabad real estate, ${project.type || "real estate"} project, ${project.location || "hyderabad"}`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateProject",
            name: project.title || "Project",
            description: metaDescription,
            url: canonicalUrl,
            image: metaImage,
            location: {
              "@type": "Place",
              address: project.location || "Hyderabad",
            },
            developer: {
              "@type": "Organization",
              name: "Terminus Group",
            },
            status: project.status || "Available",
            yearBuilt: project.yearOfCompletion || new Date().getFullYear(),
          })}
        </script>
      </Helmet>

      <div className="flex flex-col py-12 max-w-full text-gray-800">
        <div className="xl:mx-20 mx-10">
          <h1 className="sm:text-8xl text-6xl text-primary-foreground mb-3 tracking-tighter">
            {project.title || "Project Title"}
          </h1>
          <p className="text-xl text-black xl:mb-20 mb-6 leading-5 tracking-tighter">
            {project.location || "Location"}
          </p>
        </div>

        <div className="flex xl:mb-24 mb-6 max-xl:flex-col max-xl:gap-8 xl:mx-20 mx-10">
          <div className="flex-1 h-[60vh] flex">
            <img
              src={project.images && project.images[0]}
              alt={`${project.title} main`}
              fetchPriority="high"
              decoding="async"
              className="w-full object-contain cursor-pointer"
              onClick={() => openModal(project.images && project.images[0])}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <div className="xl:w-[60%] w-full">
              <p className="tracking-tighter text-lg text-black leading-tight">
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
              {(project.brochureUrl ||
                slug === "the-line-apartments-narsingi" ||
                slug === "the-pointe-villas-gollur") && (
                <>
                  <button
                    onClick={() => setShowEnquiryModal(true)}
                    className="inline-block mt-5 mb-5 text-foreground font-bold tracking-tighter text-lg text-center"
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
              {(project.websiteLink || slug === "the-line-apartments-narsingi") && (
                <p>
                  <a
                    href={
                      slug === "the-line-apartments-narsingi"
                        ? "https://theline.terminus-group.com/"
                        : project.websiteLink
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary-foreground font-bold tracking-tighter text-lg text-center underline-offset-2"
                  >
                    View more
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Project Content Section (Rich Text from Quill Editor) */}
        {project.project_content && (
          <div className="xl:mx-20 mx-10 xl:mb-24 mb-6">
            <div
              className="prose prose-lg max-w-none project-content"
              dangerouslySetInnerHTML={{ __html: project.project_content }}
            />
          </div>
        )}

        {/* YouTube Video Section */}
        {project.youtubeVideoUrl && youtubeVideoID && (
          <div className="xl:mb-24 mb-6">
            <div className="w-[90%] mx-auto">
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

        {/* Gallery Section */}
        {project.images && project.images.length > 1 && (
          <div className="xl:mx-20 mx-10 mb-24">
            <h2 className="text-4xl font-bold text-primary-foreground mb-8 tracking-tight">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.slice(1).map((imageUrl, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity h-64"
                  onClick={() => openModal(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`${project.title} - Image ${index + 2}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inline Enquiry Form — only for specific projects */}
        {inlineFormSlugs.includes(slug) && landscapeImage && (
          <section className="flex pb-20 w-full items-center justify-center overflow-hidden">
            <div className="w-[90%] grid lg:grid-cols-2 gap-6 h-auto items-stretch">
              <div className="max-lg:h-72 overflow-hidden">
                <img
                  src={landscapeImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-3xl font-bold text-primary-foreground mb-6 tracking-tight">
                  {inlineFormHeading}
                </h2>
                {inlineSuccess ? (
                  <div className="bg-foreground/5 p-8 text-center">
                    <h3 className="text-2xl font-bold text-primary-foreground mb-3">Thank You!</h3>
                    <p className="text-foreground">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form className="h-full" onSubmit={handleInlineSubmit}>
                    <div className="mb-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium sm:placeholder:text-lg placeholder:text-base outline-none"
                        value={inlineFormData.name}
                        onChange={(e) => setInlineFormData((p) => ({ ...p, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium sm:placeholder:text-lg placeholder:text-base outline-none"
                        value={inlineFormData.email}
                        onChange={(e) => setInlineFormData((p) => ({ ...p, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Your Phone Number"
                        className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium sm:placeholder:text-lg placeholder:text-base outline-none"
                        value={inlineFormData.phone}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/[^0-9]/g, "");
                          setInlineFormData((p) => ({ ...p, phone: numericValue }));
                        }}
                        pattern="[0-9]+"
                        title="Please enter a valid phone number (numbers only)"
                        maxLength={10}
                        minLength={10}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <textarea
                        name="message"
                        rows="5"
                        placeholder="Your Message"
                        className="w-full p-4 px-8 bg-foreground/5 placeholder:text-foreground placeholder:font-medium sm:placeholder:text-lg placeholder:text-base outline-none"
                        value={inlineFormData.message}
                        onChange={(e) => {
                          if (e.target.value.length > 500) {
                            toast.error("Keep your message under 500 characters", { duration: 1500 });
                            return;
                          }
                          setInlineFormData((p) => ({ ...p, message: e.target.value }));
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-primary-foreground w-full text-white py-3 px-6 cursor-pointer sm:text-lg text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isInlineSubmitting}
                    >
                      {isInlineSubmitting ? "Sending..." : "Submit"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Related Projects */}
      {relatedProjects && relatedProjects.length > 0 && (
        <div className="xl:mx-20 mx-10 py-5">
          <h2 className="text-6xl text-primary-foreground font-bold mb-7">Related Projects</h2>
          <div
            className={`grid gap-6 flex-wrap gap-y-16 ${relatedProjects.length < 3 ? "md:grid-cols-3 grid-cols-1" : "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"}`}
          >
            {relatedProjects.map((relatedProject) => (
              <div key={relatedProject._id || relatedProject.id} className="overflow-hidden group">
                <div className="relative w-full h-[400px] overflow-hidden mb-3">
                  <a href={`/projects/${relatedProject.slug}`} className="relative w-full h-full overflow-hidden">
                    <img
                      src={relatedProject.images?.[0] || relatedProject.image}
                      alt={relatedProject.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition duration-500 group-hover:blur-[2px]"
                    />
                    <div className="absolute inset-0 flex justify-top items-top bg-white/30 bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500 [word-spacing:4px]">
                      <div className="p-4">
                        <p className="text-black text-left text-xl !line-clamp-4 !text-ellipsis">
                          {relatedProject.description}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="p-0 bg-white">
                  <h2 className="font-bold text-2xl tracking-tight text-black line-clamp-1">{relatedProject.title}</h2>
                  <div>
                    <p className="text-xl text-foreground leading-4 tracking-tighter">{relatedProject.location}</p>
                    <p
                      className={cn(
                        "text-xl text-foreground leading-7 tracking-tighter",
                        relatedProject.yearOfCompletion ? "" : "opacity-0"
                      )}
                    >
                      {relatedProject.yearOfCompletion ?? "0"}
                    </p>
                  </div>
                  <div className="grid gap-2 mt-8">
                    <span className="px-2 py-1 text-sm bg-foreground/20 text-foreground text-center font-bold transition duration-300 ease-in-out hover:bg-primary-foreground hover:text-white">
                      {relatedProject.status || "Available"}
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
