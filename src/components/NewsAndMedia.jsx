import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsMedia = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get("https://terminus-group-backend-1in9.onrender.com/forms/news");
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

    const handleScroll = () => {
      const scrollThreshold = window.innerHeight / 20;
      const section = document.getElementById("news-section");
      const rect = section.getBoundingClientRect();
      setScrolled(rect.top <= scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="news-section" className="px-5 py-12 max-w-screen-xl mx-auto">
      <h1
        className={`text-7xl leading-5  mb-12 transition-colors duration-300 ${
          scrolled ? "text-orange-500" : "text-gray-400"
        }`}
      >
        News & Media
      </h1>
      {loading ? (
        <p className="text-center">Loading news data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {newsData.map((news) => (
            <div key={news.id} className=" overflow-hidden bg-white ">
              <a href={news.link} target="_blank" rel="noopener noreferrer" className="block text-inherit">
                <img src={news.image} alt={news.title} className="w-full h-64 object-cover" />
                <div className="p-0">
                  <h3 className="text-lg mt-3 tracking-tighter leading-4 font-bold  text-black">{news.title}</h3>
                  <p className="text-md leading-6 tracking-tighter text-black mt-1">{news.caption}</p>
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
