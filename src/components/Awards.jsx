import { cn } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

const AwardsComponent = ({ className }) => {
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
    <div id="awards-section" className={cn("mt-5 mb-12", className)}>
      {loading ? (
        <p className="text-center">Fetching our awards...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awardsData.map((award) => (
            <div key={award.id} className="overflow-hidden bg-white group relative">
              <div className="w-full h-[400px] overflow-hidden">
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                {/* Overlay added */}
                <div className="absolute inset-0 flex justify-top items-top bg-white/50 bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-500 [word-spacing:4px]">
                  <div className="p-4">
                    <p className="text-foreground text-left text-lg font-bold">View More</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl tracking-tighter text-black line-clamp-1">{award.title}</h3>
                <p className="text-lg text-black tracking-tighter !leading-tight line-clamp-2">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AwardsComponent;
