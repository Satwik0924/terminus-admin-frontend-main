import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const images = [
  { src: "https://www.pngmart.com/files/22/White-Background-PNG-Photo.png", text: "" },
  {
    src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-78b21707-b60f-4e60-a57c-717aabc6732b.jpg?e=webp&cX=105.98305084745763&cY=0&cW=122.03389830508475&cH=160",
    text: "Terminus Group was established in 2010, and since then, the company has been rapidly expanding, building Class-A properties in strategic locations across Hyderabad. The company has a portfolio of diversified projects in premium residential high rises, mixed-use commercial spaces, premium office towers, villa communities, 5-star serviced apartments and life science spaces. Endowed with a pool of experienced technical staff, project management teams, the company is leading the change with its expertise in multiple disciplines of construction industry.",
  },
  {
    src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-5f67c8eb-7a08-41ca-a7bb-1e5b91bff03e.jpg?e=webp&cX=0&cY=17.04444444444445&cW=334&cH=437.9111111111111",
    text: "SLN TERMINUS Shop. Dine. Work. Live.A pioneering Mixed-use commercial building located on Kondapur-Gachibowli Road, Hyderabad. It has a fine mix of premium office spaces, fine dining, retail, and a multiplex that attracts thousands of footfalls every day.",
  },
  {
    src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-4df42c0e-8c08-4e22-ad25-e2333cca4f7c.jpg?e=webp&cX=106.17675544794189&cY=0&cW=121.64648910411623&cH=160",
    text: "KRINSS VILLASA premium gated community of villas in Financial District, Hyderabad. Located just a few steps away from Outer Ring Road, KRINSS has luxury triplex villas with an enviable clubhouse.",
  },
  {
    src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-a34f793c-c89f-4d8f-b81b-890799cf8f72.jpg?e=webp&cX=0&cY=17.04444444444445&cW=334&cH=437.9111111111111",
    text: "HAMPTONS APARTMENTS <br />A gated community of luxury apartments tower with clubhouse amenities is located in Kondapur, Hyderabad.",
  },
  {
    src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-3d0348ad-fb97-4804-abad-21c7950f61e7.jpg?e=webp&cX=0&cY=17.04444444444445&cW=334&cH=437.9111111111111",
    text: "ONE WESTA 24-floors imposing corporate tower abutting Outer Ring Road offering Grade-A office spaces to brands like ADP. It is located in Financial District, Nanakramguda.",
  },
  {
    src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-26f45099-2bd3-4f7e-8f04-6d2c021b56f6.jpg?e=webp&cX=80.12348668280872&cY=0&cW=189.75302663438256&cH=248",
    text: "Text for Image 5",
  },
  {
    src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-c9318ece-ed9c-4bd7-97db-ad896c37c7e3.jpg?e=webp&cX=0&cY=17.737341772151893&cW=334&cH=436.5253164556962",
    text: "Text for Image 5",
  },
  {
    src: "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-c5c58d3a-b26d-499b-9866-957656578f4b.jpg?e=webp&cX=345.44309927360774&cY=0&cW=309.1138014527845&cH=404",
    text: "Text for Image 5",
  },
];

export default function HorizontalScrollCarousel() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Trigger horizontal scroll only after user has scrolled past half the screen
  const x = useTransform(scrollYProgress, [0, 0.1, 1], ["0%", "0%", "-80%"]);

  // Color transformation for the heading
  const headingColor = useTransform(scrollYProgress, [0, 0.2], ["#A0A0A0", "#F58220"]);

  return (
    <section ref={targetRef} style={{ position: "relative", height: "400vh" }}>
      {/* Heading Section */}

      {/* Horizontal Scroll Section */}
      <div
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          height: "120vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
          }}
        >
          <motion.h1
            style={{ color: headingColor }}
            initial={{ color: "#A0A0A0" }}
            className="transition-colors duration-900 ease-in-out md:text-[5.3rem] leading-none text-5xl mb-10 text-[#A0A0A0] text-left tracking-tighter"
          >
            Milestones
          </motion.h1>
        </div>
        <motion.div
          style={{
            display: "flex",
            gap: "32px",
            x,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              //   style={{
              //     position: "relative",
              //     width: "500px",
              //     height: "600px", // Ensure the height is consistent
              //     overflow: "hidden",
              //     transition: "transform 0.3s",
              //     cursor: "pointer",
              //   }}
              className="relative w-[500px] h-[70vh] overflow-hidden transition-transform duration-300"
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector(".overlay");
                overlay.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector(".overlay");
                overlay.style.opacity = "0";
              }}
            >
              <img
                src={image.src}
                alt={`Image ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                className="overlay text-primary-foreground"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",

                  display: "flex",
                  justifyContent: "left",
                  alignItems: "top",
                  opacity: "0",
                  transition: "opacity 0.3s",
                  fontSize: "18px",
                  verticalAlign: "top",
                }}
              >
                {image.text}
              </div>
            </div>
          ))}

          {/* Additional Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "left",
              marginLeft: "2px",
              width: "800px",
            }}
          >
            <p className="text-primary-foreground text-left text-7xl font-bold tracking-tighter">
              Setting milestones that<br></br> redefine industries and<br></br> resonate for generations.
            </p>
          </div>

          {/* Placeholder Images */}
          <div
            style={{
              position: "relative",
              width: "300px",
              height: "400px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://www.pngmart.com/files/22/White-Background-PNG-Photo.png"
              alt="Additional image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "300px",
              height: "400px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://www.pngmart.com/files/22/White-Background-PNG-Photo.png"
              alt="Additional image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
