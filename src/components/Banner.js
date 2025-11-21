import React from "react";
import "./Banner.css";

function Banner({ title, subtitle, showCTA = false, onCTAClick }) {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1 className="banner-title">{title}</h1>
        {subtitle && <p className="banner-subtitle">{subtitle}</p>}
        {showCTA && (
          <button className="banner-cta" onClick={onCTAClick}>
            Get Started
          </button>
        )}
      </div>
      <div className="banner-decoration">
        <div className="banner-circle circle-1"></div>
        <div className="banner-circle circle-2"></div>
        <div className="banner-circle circle-3"></div>
      </div>
    </div>
  );
}

export default Banner;
