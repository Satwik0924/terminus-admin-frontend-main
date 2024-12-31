import React, { useState } from "react";

const ImageSlider = () => {
  const images = [
    {
      src: "/assets/i1.jpg",
      link: "",
      caption:
        "Terminus is donated Rs.5 lakhs to Care-O-Safe on behalf of 100 valued well-wishers. With this contribution, we aim to improve the lives of over 2,300 individuals. Care-O-Safe manufactures reusable menstrual products, making menstrual care both eco-friendly and cost-effective.",
    },
    {
      src: "/assets/i2.jpg",
      link: "",
      caption: "Contributed by providing scholarships for students from economically poor backgrounds",
    },
    {
      src: "/assets/i3.jpg",
      link: "#",
      caption:
        "Long association with IMPACT, a non-profit working for children with cancer based out of Hyderabad, with INR 5L in November 2021",
    },
    {
      src: "/assets/i6.jpg",
      link: "",
      caption: "Donated Bolero to Fire Services DG at Lakdikapul",
    },
    {
      src: "/assets/i5.jpg",
      link: "",
      caption: "Built the Bharosa Centre for Telangana Police with an investment of INR 1Cr in August 2021",
    },
    {
      src: "/assets/i4.jpg",
      link: "#",
      caption: "Donated USD $100K for Sparsh Hospice's Palliative Care facility at Kajaguda in September 2021",
    },
    {
      src: "/assets/i9.jpg",
      link: "",
      caption:
        "CMD Mr. S.P. Reddy was felicitated by Telangana Home Minister Md. Mahmood Ali for his pivotal role and spearheading the development of the Telangana State Special Police Convention Centre",
    },
    {
      src: "/assets/i8.jpg",
      link: "",
      caption:
        "Adopted 13 fire stations out of 16 under the District Fire Officer Ranga Reddy Division, contributing INR 50L to Telangana Fire Services Department in 2017.",
    },
    {
      src: "/assets/i7.jpg",
      link: "#",
      caption:
        "Contributed INR 1Cr to AIG Rural Outreach Program for advanced medical care in villages in August 2021. Also established a specialized Inflammatory Bowel Disease (IBD) center at AIG",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full mb-7">
      {/* Image Slider */}
      <div className="relative group">
        <a href={images[currentIndex].link} className="block relative">
          <img
            src={images[currentIndex].src}
            alt={`Image ${currentIndex + 1}`}
            className="w-full transition-transform duration-100 h-[75vh] object-cover object-top"
          />
        </a>
      </div>

      {/* Caption Below Slider */}
      <div className="mt-4 text-left leading-tight tracking-tighter text-black text-md">
        {images[currentIndex].caption}
      </div>

      {/* Left Arrow */}
      <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
        <svg className="w-10 h-9" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
        <svg className="w-10 h-8" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ImageSlider;
