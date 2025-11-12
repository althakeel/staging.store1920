import React, { useState, useEffect } from "react";

const Section3 = ({ product }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  if (!product) return null; // ✅ Prevent errors if no product is passed

  return (
    <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff" }}>
      {/* Title */}
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "40px" }}>
       {product.section3title}
      </h2>

      {/* Mobile Layout */}
      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
          {/* IMAGE */}
          <img
            src={product.section3image}
            alt="section3"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          {/* POINTS */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
              width: "100%",
            }}
          >
            {product.section3points?.map((point, index) => (
              <div
                key={index}
                style={{
                  background: "#f9f1ef",
                  padding: "20px",
                  borderRadius: "12px",
                  textAlign: "center",
                  fontSize: "16px",
                  color: "#a66c6c",
                  fontWeight: "500",
                  width: "calc(50% - 10px)", // 2 items per row
                  maxWidth: "150px",
                }}
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* LEFT POINTS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
            {product.section3points?.slice(0, 2).map((point, index) => (
              <div
                key={index}
                style={{
                  background: "#f9f1ef",
                  padding: "20px",
                  borderRadius: "12px",
                  width: "220px",
                  textAlign: "center",
                  fontSize: "15px",
                  color: "#a66c6c",
                  fontWeight: "500",
                }}
              >
                {point}
              </div>
            ))}
          </div>

          {/* IMAGE */}
          <div style={{ textAlign: "center" }}>
            <img
              src={product.section3image}
              alt="section3"
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* RIGHT POINTS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
            {product.section3points?.slice(2, 4).map((point, index) => (
              <div
                key={index}
                style={{
                  background: "#f9f1ef",
                  padding: "20px",
                  borderRadius: "12px",
                  width: "220px",
                  textAlign: "center",
                  fontSize: "15px",
                  color: "#a66c6c",
                  fontWeight: "500",
                }}
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Section3;
