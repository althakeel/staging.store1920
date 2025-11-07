import React from "react";
import staticProducts from "../../data/staticProducts";
import Worldwide from '../../assets/images/staticproducts/common/worldwideshipping (1).webp'
import Support from '../../assets/images/staticproducts/common/24x7support (1).webp'
import Quality from '../../assets/images/staticproducts/common/./verifiedqualityonly.webp'
import Hassle from '../../assets/images/staticproducts/common/hasslefree.webp'

const Section4 = () => {
  const product = staticProducts[0];

const featureImages = [Worldwide, Support, Quality, Hassle];
  const featureTitles = product.section2contentPoints.slice(0, 4);

  const features = featureImages.map((img, index) => ({
    icon: img,
    text: featureTitles[index] || "",
  }));

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#f5f5f5",
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "40px" }}>Features</h2> */}

      {/* Features Flex Wrap */}
      <div
        style={{
          maxWidth: "1400px",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 calc(25% - 30px)", // desktop: 4 columns
              maxWidth: "250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={feature.icon}
              alt={feature.text}
              style={{ width: "80px", height: "80px", marginBottom: "15px" }}
            />
            <p style={{ fontSize: "16px", fontWeight: "500" }}>{feature.text}</p>
          </div>
        ))}
      </div>

      {/* Responsive for mobile 2x2 */}
      <style>
        {`
          @media (max-width: 768px) {
            div[style*="flex-wrap"] > div {
              flex: 1 1 calc(50% - 15px) !important; /* 2 per row */
              max-width: calc(50% - 15px) !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Section4;
