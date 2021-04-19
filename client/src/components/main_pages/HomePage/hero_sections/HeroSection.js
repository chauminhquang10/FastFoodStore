import React from "react";
import Button from "../../../headers/Button";
import "./HeroSection.css";
import intro_video from "../../../../video/intro-video.mp4";

const HeroSection = () => {
  return (
    <>
      <div className="hero-container">
        <video src={intro_video} autoPlay loop muted />
        <h1>FOOD HEAVEN</h1>
        <p>What are you waiting for?</p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            JOIN NOW !
          </Button>
          <Button
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
          >
            WATCH TRAILER <i className="far fa-play-circle"></i>
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
