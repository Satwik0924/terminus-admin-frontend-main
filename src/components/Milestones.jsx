import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const Milestones = () => {
  const headingAnimation = useAnimation();

  const [selectedYear, setSelectedYear] = useState("2012");

  useEffect(() => {
    const handleScroll = () => {
      const heading = document.getElementById("milestones");
      if (heading) {
        const rect = heading.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top < window.innerHeight / 2;

        if (isVisible) {
          headingAnimation.start({
            color: "#F58220",
            transition: { duration: 0.7 },
          });
        } else {
          headingAnimation.start({
            color: "#A0A0A0",
            transition: { duration: 0.7 },
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headingAnimation]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "instant" });
      }
    }
  }, [window.location.hash]);

  const milestones = {
    2012: {
      title: ["SLN TERMINUS"],
      description: [
        "A pioneering Mixed-use commercial building located on Kondapur-Gachibowli Road, Hyderabad. It has a fine mix of premium office spaces, fine dining, retail, and a multiplex that attracts thousands of footfalls every day.",
      ],
      image: [
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-12515100-ca34-49e0-a27b-27c17aa84508.jpg?w=1808&e=webp&cX=1&cY=10&cW=2769&cH=1980",
      ],
      imageType: "single",
    },
    2014: {
      title: ["KRINSS VILLAS"],
      description: [
        "A premium gated community of villas in Financial District, Hyderabad. Krinss has luxury villas ranging from 5000-9000 sq ft with a clubhouse that hosts a range of amenities.",
      ],
      image: [
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-571abd09-026a-4048-9870-05d793927773.jpg?e=webp&cX=244&cY=31&cW=1274&cH=913",
      ],
      imageType: "single",
    },
    2016: {
      title: ["MARRIOTT EXECUTIVE APARTMENTS"],
      description: [
        "The five-star executive apartments in Gachibowli offer hospitality under the iconic Marriott brand. It also houses “Mazzo”, a rooftop multi-cuisine restaurant and a swimming pool.",
      ],
      image: [
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-791e2a4e-7bf0-490a-8b6c-2a875986b221.jpg?e=webp&cX=83&cY=27&cW=1115&cH=799",
      ],
      imageType: "single",
    },
    2017: {
      title: ["HAMPTONS APARTMENTS"],
      description: [
        "A gated community of luxury apartments tower with clubhouse amenities is located in Kondapur, Hyderabad.",
      ],
      image: [
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-5c82839e-222f-4654-91f3-f3167bf691dc.jpg?e=webp&cX=0&cY=7.074380165289256&cW=1200&cH=857.8512396694215",
      ],
      imageType: "single",
    },
    2018: {
      title: ["ONE WEST"],
      description: [
        "A 24-floors corporate tower in the heart of the Financial District offering Grade-A office spaces. ADP moves its India Headquarters to One West.",
      ],
      image: [
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-72e9c249-3bc6-4bdc-a243-bd975974dd4b.jpg?w=1808&e=webp&cX=379.1560693641618&cY=0&cW=2797.6878612716764&cH=2000",
      ],
      imageType: "single",
    },
    2019: {
      title: ["THE DISTRICT"],
      description: [
        "Located in the centre of the Financial District, The District is a premium tower offering Grade-A office, retail and fine dining spaces to global brands.",
      ],
      image: [
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-4b083bda-74b7-46bc-818b-09ff935eb7ca.jpg?e=webp",
      ],
      imageType: "single",
    },
    2021: {
      title: ["B-HUB"],
      description: [
        "Terminus group enters the pharmaceutical real estate market.\n The Bio-Pharma Hub will be Genome Valley’s largest incubator with a bioprocess scale-up facility. It is located near Shamirpet, Hyderabad.",
      ],
      image: [
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-be47ac27-eb50-49a6-ae3f-e7e2b7fbacae.jpg?w=1808&e=webp&cX=222.94219653179186&cY=0&cW=1554.1156069364163&cH=1111",
      ],
      imageType: "single",
    },
    2022: {
      title: ["ONE GOLDEN MILE"],
      description: [
        "An iconic tower in the business district of Kokapet, offering Grade-A office spaces for IT companies and exclusive retail space for high net-worth customers.\n Microchip Technology opens a new R&D facility at One Golden Mile, with capacity for over a 1000 employees.",
      ],
      image: [
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-72e5811a-cc0c-4222-bca0-33e9ffd2be9f.jpg?w=1808&e=webp&cX=101.1560693641618&cY=0&cW=2797.6878612716764&cH=2000",
      ],
      imageType: "single",
    },
    2023: {
      title: ["THE POINTE", "THE LINE"],
      description: [
        "A premium gated community of 183  luxury villas in Gollur Hyderabad.",
        "High-rise residential apartments in Narsingi, offering thoughtfully designed 2 BHK, 3 BHK, and duplex apartments.",
      ],
      image: [
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-1402200a-c553-4fd8-ac5f-1c816299276d.jpg?w=904&e=webp&cX=2036&cY=0&cW=1928&cH=2748",
        "/assets/BuildingElevation_NightFinal.png",
      ],
      imageType: "side-by-side",
    },
    2024: {
      title: ["THE SWITCH  – Hi Tech City", "Renaissance Hotel - Hi Tech City"],
      description: [
        "A mixed-use development, containing world class retail and office space,   featuring a Renaissance Hotel, set on a 2.7-acre plot.",
        "The Renaissance Hotel offers an exceptional hospitality experience. With a spacious banquet hall perfect for hosting events, it combining elegance and functionality, making it the ideal destination for both leisure and celebrations.",
      ],
      image: ["/assets/Scene 15_1-2.jpg"],
      imageType: "stacked",
    },
    2025: {
      title: [
        "ARANYA - GANDIPET",
        "FiDi 9 – FINANCIAL DISTRICT",
        "Moxy Hotel - FINANCIAL DISTRICT",
        "ALOMA - Completed",
      ],
      description: [
        "A premium luxury villa community blending luxury, serenity, and exclusivity in Gandipet's scenic hills.",
        "A mixed-use development, containing world class retail and office space, featuring a Moxy Hotel ",
        "Terminus group signs to open the 1st Moxy hotel in Hyderabad, the 160 room hotel will debut in late 2026.",
        "An exclusive plotted development located strategically in the serene surroundings featuring exceptional landscaping and amenities, elevating modern living",
      ],
      image: [
        "/assets/9Fidi-Elevation Render.jpeg",
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-de2d134a-a862-466f-b8d9-805af701773d.jpg?w=1808&e=webp&cX=0&cY=49.46797520661164&cW=2667&cH=1901.0640495867767",
        "/assets/project-677cd640d4c339fbb7184c82-image-0-1765549253394.jpg",
      ],
      imageType: "side-by-side-stacked",
    },
    2026: {
      title: ["GINGER BY IHCL– GENOME VALLEY - OPENED", "TWO WEST - NARSINGI", "FAIRFIELD - SRI CITY"],
      description: [
        "A select-service hotel featuring 100 keys on a 1-acre plot",
        "Grade-A office space located at a prime business destination. The project is strategically situated with excellent connectivity to Gachibowli, Financial District, and HITEC City, making it highly accessible. Surrounded by top corporates, the perfect ecosystem for global businesses to thrive. This modern workspace is designed to meet international standards, catering to the dynamic needs of MNCs.",
        "The Fairfield Hotel by Marriott is an upcoming select services hotel offering 120 well-appointed keys. Designed for modern travelers, it will provide comfortable and efficient accommodations with a focus on quality and convenience.",
      ],
      image: ["/assets/Fasade-(AMP5699).jpg", "/assets/View_01_IMPACT3D_TERMINUS_TWO_WEST.png"],
      imageType: "side-by-side",
    },
    Upcoming: {
      title: ["THE HIGHLINE", "ONE NORTH – GENOME VALLEY"],
      description: [
        "An upcoming premium residential development featuring G+30 floors and 504 thoughtfully designed apartments, spread across 3.5 acres of land.",
        "A premier life sciences project spanning 40 acres with a built-up area of 20 lakh sft.",
      ],
      image: [
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-f70fe009-dec0-425f-9e39-19dc06e5b216.jpg?w=904&e=webp&cX=49.13583815028892&cY=0&cW=1901.7283236994222&cH=2719",
        "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5089501/image-f0869896-e580-45f4-88c2-130f5a762875.jpg?w=840&e=webp&cX=675.792507204611&cY=0&cW=648.4149855907782&cH=1000",
      ],
      imageType: "side-by-side",
    },
  };

  const getImageContainerStyles = () => {
    const type = milestones[selectedYear].imageType;

    switch (type) {
      case "side-by-side":
        return "!grid-cols-2 gap-3";
      case "stacked-side-by-side":
        return "!grid-cols-2 !grid-rows-2 gap-3";
      case "side-by-side-stacked":
        return "!grid-cols-2 !grid-rows-2 gap-3";
      default:
        return "!place-items-center";
    }
  };

  const getImageStyles = (index) => {
    const type = milestones[selectedYear].imageType;

    switch (type) {
      case "side-by-side":
        return "col-span-1";
      case "side-by-side-stacked":
        return index === 0 ? "col-span-1 row-span-2" : "col-span-1 row-span-1";
      case "stacked-side-by-side":
        return index === 0 ? "col-span-2 row-span-1" : "col-span-1 lg:max-h-[25vh]";
      case "stacked":
        return "col-span-1 row-span-1 py-2";
      default:
        if (selectedYear === "2019") {
          return "max-h-[75vh] object-contain";
        }
        break;
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <section className="flex flex-col justify-center items-center h-auto lg:py-40 py-20 w-full" id="explore-projects">
      <div className="w-[90%]">
        {/* Heading */}
        <motion.h2
          id="milestones"
          animate={headingAnimation}
          initial={{ color: "#A0A0A0" }}
          className="md:text-[5.3rem] leading-none text-5xl mb-10 font-medium text-[#A0A0A0] text-left tracking-tighter"
        >
          Milestones
        </motion.h2>
        <div className="flex sm:gap-24 gap-10 max-lg:flex-col">
          {/* Years */}
          <div className="flex lg:flex-col max-lg:gap-4 max-lg:flex-wrap">
            {Object.keys(milestones).map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`${selectedYear === year ? "text-primary-foreground" : "text-foreground/20"} text-6xl max-sm:text-2xl font-medium hover:text-primary-foreground transition-colors duration-300 ease-out`}
              >
                {year}
              </button>
            ))}
          </div>
          {/* Milestones */}
          <div className={cn("flex-grow w-full mt-6")}>
            <div className="flex gap-10 w-full max-lg:flex-col-reverse">
              {/* Content */}
              <div className="flex-1 space-y-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedYear}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeVariants}
                    transition={{ duration: 0.5 }}
                    className="space-y-10"
                  >
                    {milestones[selectedYear].title.map((title, index) => (
                      <div className="space-y-2" key={title}>
                        <h2 className="text-lg tracking-tighter font-extrabold text-foreground">{title}</h2>
                        <p className="text-lg text-foreground !leading-tight tracking-tighter">
                          {milestones[selectedYear].description[index] ?? ""}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Image */}
              <div className="flex-[2]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedYear}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeVariants}
                    transition={{ duration: 0.5 }}
                    className={cn("grid grid-cols-1", getImageContainerStyles())}
                  >
                    {milestones[selectedYear].image.map((src, index) => (
                      <img
                        key={src}
                        src={src}
                        alt="Milestone"
                        className={cn("object-cover w-full h-full", getImageStyles(index))}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Milestones;
