import React from "react";

const Hero = ({ title, subtitle, imageUrl, subtitleStyle }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1
            style={{
              marginBottom: "2px",
              fontSize: "3rem",
              fontWeight: "bold",
              color: "#2c3e50",
            }}
          >
            {title}
          </h1>
          <h3
            style={{
              marginTop: "0",
              fontWeight: "normal", // Removed boldness
              ...subtitleStyle, // Apply custom subtitle styles
            }}
          >
            {subtitle}
          </h3>
          <p
            style={{
              lineHeight: "1.8",
            }}
          >
            Say goodbye to long waiting times with eDoc! Our smart platform connects you with top doctors for easy online appointments. Whether it's a routine check-up or urgent consultation, we’ve got you covered. Enjoy stress-free booking and personalized healthcare at your fingertips. Your health, your schedule.
          </p>
        </div>
        <div className="banner" style={{ marginTop: "-20px" }}>
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
