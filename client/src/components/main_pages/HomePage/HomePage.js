import React, { useContext, useState } from "react";

// import { GlobalState } from "../../../GlobalState";

import HeroSection from "./hero_sections/HeroSection";
import Cards from "./card_items/Cards";

import Grid_cards from "./Grid_cards/Grid-cards";

import { motion } from "framer-motion";

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
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <HeroSection></HeroSection>
      <Grid_cards></Grid_cards>
      <Cards></Cards>
    </motion.div>
  );
};

export default HomePage;
