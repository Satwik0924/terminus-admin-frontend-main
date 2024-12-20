import React, { useState, useEffect } from "react";
import axios from "axios";

const AwardsComponent = () => {
  const [awardsData, setAwardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchAwardsData = async () => {
      try {
        const response = await axios.get("https://api.terminus-group.com/forms/awards");
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

    const handleScroll = () => {
      const scrollThreshold = window.innerHeight / 2;
      const section = document.getElementById("awards-section");
      const rect = section.getBoundingClientRect();
      setScrolled(rect.top <= scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="awards-section" className="px-5 py-12 max-w-screen-xl mx-auto">
      {loading ? (
        <p className="text-center">Loading awards data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {awardsData.map((award) => (
            <div key={award.id} className="  overflow-hidden bg-white ">
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:blur-sm"
                />
              </div>
              <div className="p-0">
                <h3 className="text-3xl tracking-tighter  text-black mb-2">{award.title}</h3>
                <p className="text-lg text-black">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AwardsComponent;
