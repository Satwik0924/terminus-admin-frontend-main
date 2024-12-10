import React, { useState, useEffect } from "react";
import axios from "axios";

const AwardsComponent = () => {
  const [awardsData, setAwardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwardsData = async () => {
      try {
        const response = await axios.get(
          "https://terminus-group-backend-1in9.onrender.com/forms/awards"
        );
        const transformedData = response.data.map((award) => ({
          id: award._id,
          title: award.name,
          description: award.description,
          image: award.image,
        }));
        setAwardsData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching awards data:", error);
        setLoading(false);
      }
    };

    fetchAwardsData();
  }, []);

  return (
    <div
      style={{
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: "orange",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Awards
      </h1>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading awards data...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {awardsData.map((award) => (
            <div
              key={award.id}
              style={{
                textAlign: "center",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  transition: "transform 0.3s, filter 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "blur(1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "none";
                }}
              >
                <img
                  src={award.image}
                  alt={award.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
              </div>
              <div style={{ padding: "15px" }}>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "8px",
                  }}
                >
                  {award.title}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.5",
                  }}
                >
                  {award.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AwardsComponent;
