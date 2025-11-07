import React from "react";

const Slider = () => {
const sentences = [
  "Fast & Reliable Delivery to Your Doorstep.",
  "Each Item Passes Rigorous Quality Checks.",
  "Safe Packaging to Prevent Any Damage.",
  "All over UAE Shipping with Hassle-Free Returns.",
  "100% Secure Payment & Data Protection.",
  "Money-Back Guarantee if You’re Not Satisfied."
];
  const containerStyle = {
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#e86c1aff",
    padding: "20px 0",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
    whiteSpace: "nowrap",
    position: "relative",
  };

  const marqueeStyle = {
    display: "inline-block",
    animation: "marquee 20s linear infinite",
  };

  const textStyle = {
    display: "inline-block",
    paddingRight: "50px",
  };

  return (
    <div style={containerStyle}>
      <div style={marqueeStyle}>
        {/* Render sentences twice for seamless looping */}
        {sentences.concat(sentences).map((text, idx) => (
          <span style={textStyle} key={idx}>
            {text}
          </span>
        ))}
      </div>

      {/* Inline keyframes */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default Slider;
