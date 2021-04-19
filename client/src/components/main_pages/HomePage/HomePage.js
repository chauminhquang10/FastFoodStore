import React, { useContext, useState } from "react";
import ImageSlider from "./Img-Slider/ImageSlider";
// import { GlobalState } from "../../../GlobalState";
import { SliderData } from "./Img-Slider/SliderData";
import HeroSection from "./hero_sections/HeroSection";
import Cards from "./card_items/Cards";

const HomePage = () => {
  // const state = useContext(GlobalState);
  // const [products, setProducts] = state.productsAPI.products;
  // const [slides, setSlides] = useState([]);

  // products.forEach((product) => {
  //   if (product.image) {
  //     setSlides([...slides, { ...product }]);
  //   }
  // });

  return (
    <>
      <HeroSection></HeroSection>
      <ImageSlider slides={SliderData}></ImageSlider>
      <Cards></Cards>
    </>
  );
};

export default HomePage;
