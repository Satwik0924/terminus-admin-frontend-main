import React from "react";

const ContactSection = () => {
  return (
    <section
      style={{
        display: "flex",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <img
          src="https://via.placeholder.com/600x400" // Replace this with the actual map image or embed
          alt="Map"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div style={{ flex: 1, padding: "0 20px" }}>
        <form>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="phone"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Ph. No.
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="message"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#F47216",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Get In Touch
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
