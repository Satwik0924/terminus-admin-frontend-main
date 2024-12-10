import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsMedia = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(
          "https://terminus-group-backend-1in9.onrender.com/forms/news"
        );
        const transformedData = response.data.map((news) => ({
          id: news._id,
          title: news.header,
          caption: news.caption,
          image: news.image,
          link: news.articleUrl,
        }));
        setNewsData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setLoading(false);
      }
    };

    fetchNewsData();
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
        News & Media
      </h1>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading news data...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {newsData.map((news) => (
            <div
              key={news.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={news.image}
                  alt={news.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "15px" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    {news.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    {news.caption}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsMedia;
