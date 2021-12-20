import Button from "../../../headers/Button";
import "./HeroSection.css";
//import intro_video from "../../../../video/intro-video.mp4";
import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";
const HeroSection = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  return (
    <>
      <div className="hero-container">
        <video
          src="https://res.cloudinary.com/minh-quang-21-kg/video/upload/v1639981681/FASTFOOD%20VIDEO/vegetables-_Copyright_Free_Videos-Motion_Graphics-_Background_Animation-Video_Clips_gpoiob.mkv"
          autoPlay
          loop
          muted
        />
        <h1>Thiên đường nông sản</h1>
        <p>Bạn còn mong chờ điều gì?</p>
        <div className="hero-btns">
          <Button
            isLogged={isLogged}
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            Đặt Hàng !
          </Button>
          <Button
            isLogged={isLogged}
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
          >
            Mua Ngay <i className="far fa-play-circle"></i>
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
