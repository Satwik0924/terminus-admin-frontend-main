import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: (
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black rounded-full p-2 shadow-lg cursor-pointer">
        &rarr;
      </div>
    ),
    prevArrow: (
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black rounded-full p-2 shadow-lg cursor-pointer">
        &larr;
      </div>
    ),
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <Slider {...settings}>
        <div className="relative">
          <img src="https://via.placeholder.com/600x400" alt="Slide 1" className="w-full h-auto" />
        </div>
        <div className="relative">
          <img src="https://via.placeholder.com/600x400" alt="Slide 2" className="w-full h-auto" />
        </div>
        <div className="relative">
          <img src="https://via.placeholder.com/600x400" alt="Slide 3" className="w-full h-auto" />
        </div>
        <div className="relative">
          <img src="https://via.placeholder.com/600x400" alt="Slide 4" className="w-full h-auto" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
