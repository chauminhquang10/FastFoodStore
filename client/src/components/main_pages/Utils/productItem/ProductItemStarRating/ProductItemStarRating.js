import React, { useState, useEffect } from "react";

import "./ProductItemStarRating.css";

const ProductItemStarRating = ({ rating }) => {
  const [starWidth, setStarWidth] = useState("");

  useEffect(() => {
    const getRatings = () => {
      //get percentage
      const starPercentage = (rating / 5) * 100;

      // Round to nearest
      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

      setStarWidth(starPercentageRounded);
    };
    getRatings();
  }, [rating]);

  return (
    <div className="stars-outer">
      <div className="stars-inner" style={{ width: starWidth }}></div>
    </div>
  );
};

export default ProductItemStarRating;
