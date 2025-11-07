import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import staticProducts from "../../data/staticProducts";

const Comparison = () => {
  const { slug } = useParams(); // ✅ match slug from route

  // ✅ Find by slug instead of numeric id
  const product =
    staticProducts.find((p) => p.slug === slug) || staticProducts[0];

  const comparison = product.comparisonData || { headers: [], rows: [] };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 20px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          alignItems: "flex-start",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Left column: Text */}
        <div style={{ flex: "1 1 45%", minWidth: 300 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
            {comparison.title || "Comparison"}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#555" }}>
            {comparison.description ||
              `Elevate your routine with ${product.name}. See how it compares to others.`}
          </p>
        </div>

        {/* Right column: Table */}
        <div style={{ flex: "1 1 45%", minWidth: 320, overflowX: "auto" }}>
          <div
            style={{
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid #eee",
              width: "100%",
              minWidth: 300,
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr 1fr",
                fontWeight: 600,
                fontSize: 16,
                textAlign: "center",
                background: "#f8f8f8",
                padding: "12px 0",
              }}
            >
              {comparison.headers.map((header, idx) => (
                <div
                  key={idx}
                  style={idx === 1 ? { background: "#fff5f2", color: "#d6336c", fontWeight: 700 } : {}}
                >
                  {header}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {comparison.rows.map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr",
                  alignItems: "center",
                  padding: "14px 10px",
                  fontSize: 15,
                  color: "#333",
                  borderBottom: "1px solid #eee",
                  background: idx % 2 ? "#fafafa" : "#fff",
                }}
              >
                <div>{row.feature}</div>
                <div style={{ textAlign: "center" }}>
                  {row.lumineux ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </div>
                <div style={{ textAlign: "center" }}>
                  {row.others ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
