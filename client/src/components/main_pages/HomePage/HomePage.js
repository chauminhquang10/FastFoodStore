import React, { useContext, useState } from "react";

import HeroSection from "./hero_sections/HeroSection";
import Cards from "./card_items/Cards";

import Grid_cards from "./Grid_cards/Grid-cards";

import { motion } from "framer-motion";

const HomePage = () => {
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
