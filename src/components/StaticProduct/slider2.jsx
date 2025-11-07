import React from "react";

const Slider = () => {
const sentences = [
  "Fast & Secure Delivery All over UAE",
  "Quality You Can Count On",
  "Easy Returns, Hassle-Free Refunds",
  "Exclusive Deals Updated Daily",
  "Secure Payments, Peace of Mind"
];


  return (
    <div className="slider-container">
      <div className="marquee">
        {sentences.concat(sentences).map((text, idx) => (
          <span className="marquee-text" key={idx}>
            {text}
          </span>
        ))}
      </div>

      <style>
        {`
          .slider-container {
            width: 100%;
            overflow: hidden;
            padding: 35px 0;
            color: #fff;
            font-weight: bold;
            font-size: 18px;
            white-space: nowrap;
            position: relative;

            /* Solid background color */
            background-color: #c1857b;

            /* Your particles background */
            background-image: url('/particles-bg.png'); /* put your uploaded image path here */
            background-repeat: repeat;
            background-size: auto;
            background-position: center;

            /* Twinkle effect */
            animation: twinkle 3s infinite alternate;
          }

          .marquee {
            display: inline-block;
            animation: marquee 20s linear infinite;
            position: relative;
            z-index: 2;
          }

          .marquee-text {
            display: inline-block;
            padding-right: 50px;
          }

          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes twinkle {
            0% { filter: brightness(0.9); }
            50% { filter: brightness(1.1); }
            100% { filter: brightness(0.9); }
          }
        `}
      </style>
    </div>
  );
};

export default Slider;
