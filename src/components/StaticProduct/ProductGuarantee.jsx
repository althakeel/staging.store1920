import React from "react";
import QualityBadge from "../../assets/images/staticproducts/common/1 (7).webp";

const GuaranteeSection = () => {
  return (
    <div className="guarantee-section">
      {/* Top Blur */}
      <div className="top-blur"></div>

      {/* Content container (max 1400px) */}
      <div className="guarantee-container">
        <div className="guarantee-content">
          <div className="text-block">
            <h2>Our 30-Day Risk-Free Guarantee</h2>
            <p>
              We understand that trying something new can be daunting, which is
              why we offer a 30-day money-back guarantee—your satisfaction is our
              priority. If you're not completely thrilled with the results, simply
              return it for a full refund—no questions asked.
            </p>
          </div>
          <div className="image-block">
            <img src={QualityBadge} alt="Quality Guarantee" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="bottom-wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#f9f8f6"
            fillOpacity="1"
            d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,181.3C672,171,768,117,864,128C960,139,1056,213,1152,240C1248,267,1344,245,1392,234.7L1440,224L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      <style>{`
        .guarantee-section {
          background-color: #c28581;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        /* Top blur effect */
        .top-blur {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background: linear-gradient(to bottom, #f9f8f6, rgba(201,133,129,0));
        }

        /* Outer container centers content */
        .guarantee-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .guarantee-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        .text-block {
          flex: 1;
          min-width: 280px;
          text-align: center;
        }

        .text-block h2 {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 15px;
        }

        .text-block p {
          font-size: 16px;
          line-height: 1.6;
          color: #fff;
        }

        .image-block {
          flex: 1;
          min-width: 250px;
          display: flex;
          justify-content: center;
        }

        .image-block img {
          max-width: 280px;
          width: 100%;
          height: auto;
        }

        /* Bottom wave full width */
        .bottom-wave {
          position: relative;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        .bottom-wave svg {
          display: block;
          width: 100%;
          height: 100px;
        }

        @media (max-width: 768px) {
          .guarantee-content {
            flex-direction: column;
            text-align: center;
          }
          .image-block img {
            max-width: 200px;
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default GuaranteeSection;
