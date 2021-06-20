import React, { useEffect } from "react";
import CardItem from "./CardItem";
import "./Cards.css";
import food_1 from "../../../../images/food1.jpg";
import food_2 from "../../../../images/food2.jpg";
import food_3 from "../../../../images/food3.jpg";
import food_4 from "../../../../images/food4.jpg";
import food_5 from "../../../../images/food5.jpeg";

import Aos from "aos";
import "aos/dist/aos.css";

const Cards = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, offset: 400 });
  }, []);
  return (
    <div className="cards">
      <h1>Check out these marvelous food!</h1>
      <div className="cards__container">
        <div data-aos="fade-up">
          <div className="cards__wrapper">
            <ul className="cards__items">
              <CardItem
                src={food_1}
                text="Explore the world of food - Eat whatever you want"
                label="Tasty"
                path="/"
              ></CardItem>
              <CardItem
                src={food_2}
                text="Delicious fried dishes that you won't find anywhere"
                label="Crunchy"
                path="/"
              ></CardItem>
            </ul>
            <ul className="cards__items">
              <CardItem
                src={food_3}
                text="Just sit down and take a bit of our harmburgers"
                label="Enjoyable"
                path="/"
              />
              <CardItem
                src={food_4}
                text="Stimulate your appetite with awesome combos"
                label="Fragrant"
                path="/products"
              />
              <CardItem
                src={food_5}
                text="Not only cheap but also good to your health"
                label="Nutritious"
                path="/"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
