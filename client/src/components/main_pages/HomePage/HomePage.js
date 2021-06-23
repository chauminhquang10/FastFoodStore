import React, { useContext, useState } from "react";

import HeroSection from "./hero_sections/HeroSection";
import Cards from "./card_items/Cards";

import Grid_cards from "./Grid_cards/Grid-cards";

import PopUp from "../discounts/Controls/PopUp";

import Quotes from "./quotes/Quotes";

import { motion } from "framer-motion";

const HomePage = () => {
  const [openPopUp, setOpenPopUp] = useState(true);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      {/* <PopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} title="">
        <Quotes></Quotes>
      </PopUp> */}
      <HeroSection></HeroSection>
      <Grid_cards></Grid_cards>
      <Cards></Cards>
    </motion.div>
  );
};

export default HomePage;
