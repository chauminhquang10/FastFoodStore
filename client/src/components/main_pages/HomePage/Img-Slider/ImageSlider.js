import React, { useState, useEffect, useRef } from "react";
import "./ImageSlider.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const ImageSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlay = 3;
  const slidesLength = slides.length;

  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const interval = setInterval(autoPlayRef.current, autoPlay * 1000);
    return () => clearInterval(interval);
  });

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slidesLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slidesLength - 1 : currentSlide - 1);
  };

  if (!Array.isArray(slides) || slidesLength <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft
        className="left-arrow"
        onClick={prevSlide}
      ></FaArrowAltCircleLeft>
      <FaArrowAltCircleRight
        className="right-arrow"
        onClick={nextSlide}
      ></FaArrowAltCircleRight>
      {slides.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide active" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <img src={slide.img_url} className="img"></img>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
