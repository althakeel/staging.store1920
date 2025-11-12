import React, { useState, useEffect } from "react";
import staticProducts from "../../data/staticProducts";

const ProgressBarSection = ({ product: propProduct }) => {
  // Use passed product OR fallback to first static product
  const product = propProduct || staticProducts[0];
  const progressItems = product?.sectionProgress || [];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!product) return null; // safeguard

  return (
    <div
      style={{
        padding: isMobile ? "24px 16px" : "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: isMobile ? "22px" : "28px",
          fontWeight: "bold",
          marginBottom: isMobile ? "24px" : "40px",
        }}
      >
        {product.sectionProgressTitle}{" "}
        <span style={{ color: "#d57b75" }}>{product.sectionProgressSubtitle}</span>
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "24px",
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {progressItems.map((item) => (
          <div
            key={item.id || item.title}
            style={{
              background: "#fff",
              padding: isMobile ? "18px" : "24px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              width: "100%",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "6px",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#555",
                marginBottom: "18px",
                lineHeight: "1.5",
              }}
            >
              {item.desc}
            </p>

            <div
              style={{
                background: "#eee",
                height: "10px",
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                marginBottom: "10px",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: `${item.percent}%`,
                  height: "100%",
                  borderRadius: "20px",
                  background:
                    "linear-gradient(90deg, rgba(255,230,230,1) 0%, rgba(213,123,117,1) 100%)",
                  transition: "width 0.6s ease-in-out",
                }}
              />
            </div>
            <div
              style={{
                textAlign: "right",
                fontWeight: "700",
                fontSize: "14px",
                color: "#333",
              }}
            >
              {item.percent}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBarSection;
