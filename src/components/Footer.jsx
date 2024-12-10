import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#F47216",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
        }}
        className="footer-container"
      >
        {/* Brand Section */}
        <div style={{ flex: "1 1 100%", textAlign: "center", marginBottom: "1rem" }}>
          <h1 style={{ color: "#d6d6d6", marginBottom: "10px" }}>TERMINUS</h1>
          <p>2024</p>
        </div>

        {/* Projects Section */}
        <div
          style={{
            flex: "1 1 calc(25% - 20px)",
            minWidth: "200px",
            textAlign: "center",
            marginBottom: "1rem",
          }}
          className="footer-section"
        >
          <h4 style={{ marginBottom: "10px" }}>Projects</h4>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            <li>Commercial</li>
            <li>Residential</li>
            <li>Hospitality</li>
            <li>Life Sciences</li>
          </ul>
        </div>

        {/* About Section */}
        <div
          style={{
            flex: "1 1 calc(25% - 20px)",
            minWidth: "200px",
            textAlign: "center",
            marginBottom: "1rem",
          }}
          className="footer-section"
        >
          <h4 style={{ marginBottom: "10px" }}>About</h4>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            <li>Team</li>
            <li>News & Media</li>
            <li>Philanthropy</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div
          style={{
            flex: "1 1 calc(25% - 20px)",
            minWidth: "200px",
            textAlign: "center",
            marginBottom: "1rem",
          }}
          className="footer-section"
        >
          <h4 style={{ marginBottom: "10px" }}>Contact</h4>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            <li>Reach Us</li>
            <li>Careers</li>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Pinterest</li>
          </ul>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .footer-container {
              flex-direction: column;
              padding: 1rem;
              text-align: center;
            }

            .footer-section {
              flex: 1 1 100%;
            }
          }

          @media (max-width: 480px) {
            .footer-container {
              padding: 0.5rem;
            }

            .footer-section ul {
              padding-left: 0;
            }

            .footer-section h4 {
              font-size: 1rem;
            }

            .footer-section li {
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
