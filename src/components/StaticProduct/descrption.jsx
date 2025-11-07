import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Description = ({ product }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!product) return null;

  // Collect all subdesc fields and filter out empty/null/whitespace
  const subdescs = [
    product.subdesc,
    product.subdesc1,
    product.subdesc2,
    product.subdesc3,
    product.subdesc4,
  ].filter((txt) => txt && txt.trim() !== "");

  const sections = [
    {
      title: "Description",
      content: (
        <div style={{ marginLeft: "10px" }}>
          {/* Only show main description if it's non-empty */}
          {product.description && (
            <li style={{ listStyle: "none" }}>{product.description}</li>
          )}

          {/* Only render the <ul> if at least one subdesc is present */}
          {subdescs.length > 0 && (
            <ul style={{ margin: "0", paddingLeft: "18px" }}>
              {subdescs.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ),
    },
    {
      title: "Processing & Shipping",
      content:
        "Enjoy free express shipping with fast 2–3 day delivery across the UAE — orders are processed and shipped within 24 hours.",
    },
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", margin: "20px 0" }}>
      {sections.map((sec, i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid #ddd",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={() => toggle(i)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "12px",
              background: "none",
              border: "none",
              outline: "none",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {sec.title}
            <FontAwesomeIcon
              icon={openIndex === i ? faAngleDown : faAngleRight}
              style={{ fontSize: "18px", color: "#333" }}
            />
          </button>

          {openIndex === i && (
            <div
              style={{
                padding: "0 12px 12px",
                fontSize: "14px",
                color: "#333",
                fontWeight: "500",
              }}
            >
              {typeof sec.content === "string" ? <p>{sec.content}</p> : sec.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Description;
