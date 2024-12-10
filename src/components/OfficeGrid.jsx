import React, { useEffect, useState } from "react";
import axios from "axios";

const OfficeComponent = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(
          "https://terminus-group-backend-1in9.onrender.com/forms/team"
        );
        const transformedData = response.data.map((member) => ({
          id: member._id,
          name: member.name,
          role: member.designation,
          image: member.image,
          linkedinUrl: member.linkedinUrl,
        }));
        setTeamData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team data:", error);
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      {/* Side Sticky Section */}
      <div
        style={{
          flex: "1",
          position: "sticky",
          top: "100px", // Sticky offset from the top
          height: "100%", // Ensures it stays within view
          paddingRight: "20px",
          display: window.innerWidth > 768 ? "block" : "none", // Hide for smaller screens
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: "20px",
            fontSize: "20px",
            lineHeight: "2",
          }}
        >
          <li><a href="#team" style={{ textDecoration: "none", color: "inherit" }}>Team</a></li>
          <li><a href="#philanthropy" style={{ textDecoration: "none", color: "inherit" }}>Philanthropy</a></li>
          <li><a href="#news" style={{ textDecoration: "none", color: "inherit" }}>News & Media</a></li>
          <li><a href="#partners" style={{ textDecoration: "none", color: "inherit" }}>Consultants & Partners</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: "3",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          width: "100%",
        }}
      >
        {/* Top Section */}
        <div id="team" style={{ textAlign: "left" }}>
          <img
            src="https://c-p.rmcdn1.net/6704dad37ea051caab873de5/5089501/Image-6f2f2b02-4bf3-40e7-b6ba-f6a5ddfcafc7.gif"
            alt="Office Scene"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
          <h1
            style={{
              fontWeight: "300",
              fontSize: "36px",
              margin: "20px 0",
            }}
          >
            The Finest.
          </h1>
          <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
            Featuring an established track record of creating luxury, retail, and
            corporate properties by partnering with experts in the engineering and
            architecture industry.
          </p>
        </div>

        {/* Team Section */}
        <div id="philanthropy" style={{ textAlign: "left" }}>
          <h2 style={{ fontWeight: "300", fontSize: "28px", margin: "10px 0" }}>
            The Team
          </h2>
          <img
            src="https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-82fc00d4-be74-4e76-887a-d79cdf4ee721.jpg"
            alt="The Team"
            style={{
              width: "100%",
              height: "auto",
              margin: "20px 0",
              borderRadius: "8px",
            }}
          />
          <p style={{ fontSize: "16px", lineHeight: "1.6", marginTop: "20px" }}>
            We believe that you can achieve the best product if you have the best people
            in your team. We have a diverse team from all fields of expertise in
            engineering, design, and management.
          </p>
        </div>

        {/* Team Members Section */}
        <div id="news">
          {loading ? (
            <p>Loading team data...</p>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {teamData.map((member) => (
                <div
                  key={member.id}
                  style={{
                    width: "200px",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                  <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                    {member.name}
                  </p>
                  <p>{member.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeComponent;
