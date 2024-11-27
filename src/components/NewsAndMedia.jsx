import React, { useState, useEffect } from "react";

const NewsMedia = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [isHeadingHighlighted, setIsHeadingHighlighted] = useState(false);

  useEffect(() => {
    // Fetch data from the backend
    fetch("YOUR_BACKEND_API_URL")
      .then((response) => response.json())
      .then((data) => setNewsItems(data))
      .catch((error) => console.error("Error fetching news items:", error));

    // Add scroll listener
    const handleScroll = () => {
      const heading = document.getElementById("news-heading");
      const rect = heading.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setIsHeadingHighlighted(true);
      } else {
        setIsHeadingHighlighted(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Heading */}
      <h1
        id="news-heading"
        style={{
          color: isHeadingHighlighted ? "orange" : "gray",
          transition: "color 0.5s",
          textAlign: "left",
          marginBottom: "20px",
          fontSize: '900',
          paddingLeft: '400px',
        }}
      >
        News & Media
      </h1>

      {/* News Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          padding: "100px 200px",
        }}
      >
        {newsItems.map((item, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            {/* News Item */}
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img
                src={item.image}
                alt={item.caption}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              />
            </a>
            <p style={{ marginTop: "10px", fontSize: "16px", fontWeight: "bold" }}>
              {item.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsMedia;
