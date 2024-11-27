import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#F47216",
        padding: "120px",
        color: "white",
        margin: "50px",
        
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div>
          <h1 style={{ color: "#d6d6d6", marginBottom: "10px" }}>TERMINUS</h1>
          <p>2024</p>
        </div>
        <div>
          <h4 style={{ marginBottom: "10px" }}>Projects</h4>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            <li>Commercial</li>
            <li>Residential</li>
            <li>Hospitality</li>
            <li>Life Sciences</li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: "10px" }}>About</h4>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            <li>Team</li>
            <li>News & Media</li>
            <li>Philanthropy</li>
          </ul>
        </div>
        <div>
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
    </footer>
  );
};

export default Footer;
