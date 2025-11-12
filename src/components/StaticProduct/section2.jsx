import React, { useState, useEffect } from "react";

const Section2 = ({ product }) => {   // ✅ take product as prop
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  if (!product) return null; // ✅ avoid crash if no product passed

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "center" : "flex-start",
        justifyContent: "space-between",
        padding: "50px 10px",
        gap: "40px",
        flexWrap: "wrap",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          flex: 1,
          minWidth: "300px",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "15px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <span style={{ color: "#d77b7b" }}>
            {product.section2contentTitle}
          </span>
        </h2>

        <p
          style={{
            fontSize: "16px",
            color: "#000000ff",
            lineHeight: "1.6",
            fontWeight: "normal",
            marginBottom: "20px",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {product.section2contentDesc}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {product.section2list?.map((point, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                fontSize: "15px",
                color: "#00000",
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <span style={{ color: "green", marginRight: "8px" }}>✔</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div style={{ flex: 1, textAlign: "center", minWidth: "280px" }}>
        <img
          src={product.section2image}
          alt={product.name}
          style={{
            width: isMobile ? "100%" : "100%",
            maxWidth: "500px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            marginBottom: isMobile ? "30px" : "0",
          }}
        />
      </div>
    </div>
  );
};

export default Section2;
