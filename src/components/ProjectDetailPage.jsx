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

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://terminus-group-backend-1in9.onrender.com/forms/project/${id}`);
        if (response.data) setProject(response.data);
        else return; // Return if the project data is not found

        // Set the YouTube video ID based on the hostname
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
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Loading Project Data...
      </div>
    );
  }

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "40px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      color: "#333",
    },
    topSection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    leftSection: {
      flex: 2,
      paddingRight: "20px",
    },
    rightSection: {
      flex: 1,
      paddingLeft: "20px",
      fontSize: "14px",
    },
    title: {
      fontSize: "42px",
      fontWeight: "bold",
      color: "#ff6600",
      marginBottom: "10px",
    },
    subTitle: {
      fontSize: "18px",
      color: "#777",
      marginBottom: "10px",
    },
    date: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "20px",
    },
    description: {
      marginTop: "20px",
      lineHeight: "1.6",
      color: "#555",
    },
    image: {
      width: "100%",
      borderRadius: "8px",
      marginTop: "20px",
      objectFit: "contain",
    },
    detailsTitle: {
      fontWeight: "bold",
      marginTop: "20px",
    },
    detail: {
      margin: "10px 0",
    },
    button: {
      display: "inline-block",
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "14px",
      backgroundColor: "#ff6600",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "5px",
    },
    additionalImagesSection: {
      marginTop: "40px",
    },
    additionalImage: {
      width: "100%",
      marginBottom: "20px",
      borderRadius: "8px",
      objectFit: "contain",
    },
    videoSection: {
      marginTop: "40px",
    },
    iframe: {
      width: "100%",
      height: "450px",
      borderRadius: "8px",
      border: "none",
    },
  };

  return (
    <div style={styles.container}>
      {/* Top Section: Title, Location, Image */}
      <div style={styles.topSection}>
        <div style={styles.leftSection}>
          <h1 style={styles.title}>{project.title}</h1>
          <p style={styles.subTitle}>Location {project.location}</p>
          <p style={styles.date}>
            Date{" "}
            {new Date(project.createdAt).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <img src={project.images && project.images[0]} alt={`${project.title} main`} style={styles.image} />
        </div>

        <div style={styles.rightSection}>
          <p style={styles.description}>
            {project.description || (
              <>
                Short Description Goes Here
                <br />
                Most people are dismayed if deprived of their pleasures. The right course belongs to him who relishes
                even the passing away of the reason for his joy and is not bitter. — Pascal
              </>
            )}
          </p>
          <p style={styles.detailsTitle}>Status</p>
          <p style={styles.detail}>{project.status}</p>
          <p style={styles.detailsTitle}>Address</p>
          <p style={styles.detail}>{project.location}</p>
          <p style={styles.detailsTitle}>Type</p>
          <p style={styles.detail}>{project.tags ? project.tags.join(", ") : "N/A"}</p>
          <p style={styles.detailsTitle}>Year of Completion</p>
          <p style={styles.detail}>{project.yearOfCompletion || "N/A"}</p>
          <p style={styles.detailsTitle}>Architect</p>
          <p style={styles.detail}>{project.architect || "N/A"}</p>
          <p style={styles.detailsTitle}>Landscape Architect</p>
          <p style={styles.detail}>{project.landscapeArchitect || "N/A"}</p>
          {project.brochureUrl && (
            <a href={project.brochureUrl} style={styles.button} target="_blank" rel="noopener noreferrer">
              Download Brochure
            </a>
          )}
        </div>
      </div>

      {/* Additional Images Section */}
      {project.images && project.images.length > 0 && (
        <div style={styles.additionalImagesSection}>
          <h2>Additional Images</h2>
          {project.images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Additional ${index + 1}`}
              style={{
                ...styles.additionalImage,
                width: "96%", // Set image width to 96% of the screen
                margin: "2% auto", // Center the image with margins
                display: "block", // Ensure block display for full width
              }}
            />
          ))}
        </div>
      )}

      {/* YouTube Video Section */}
      {project.youtubeVideoUrl && youtubeVideoID.length > 0 && (
        <div style={styles.videoSection}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoID}`}
            title="Project Video"
            style={styles.iframe}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
