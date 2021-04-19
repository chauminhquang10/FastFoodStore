import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  const STYLES = ["btn--primary", "btn--outline"];
  const SIZES = ["btn--medium", "btn--large"];

  const checkBtnStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkBtnSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to="/login" className="btn-mobile">
      <button
        className={`btn ${checkBtnStyle} ${checkBtnSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
