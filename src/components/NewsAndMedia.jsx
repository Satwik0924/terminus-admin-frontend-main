import axios from "axios";
import { useEffect, useState } from "react";

const NewsMedia = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get("https://api.terminus-group.com/forms/news");
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
      {loading ? (
        <p className="text-center">Loading news data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
          {newsData.map((news) => (
            <div key={news.id} className="overflow-hidden bg-white relative group">
              <a href={news.link} target="_blank" rel="noopener noreferrer" className="block text-inherit">
                {/* Image container */}
                <div className="relative">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-[400px] object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-80"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-white/30 bg-opacity-50 flex opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-foreground font-bold text-left align-top p-4 text-lg ">View More</span>
                  </div>
                </div>
                {/* Content */}
                <div className="">
                  <h3 className="text-lg mt-3 tracking-tighter !leading-snug font-semibold text-black line-clamp-1">
                    {news.title}
                  </h3>
                  <p className="text-lg leading-6 tracking-tighter text-foreground line-clamp-2">{news.caption}</p>
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
