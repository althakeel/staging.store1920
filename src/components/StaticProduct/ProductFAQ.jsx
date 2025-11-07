import React, { useState } from "react";

const ProductFAQ = ({ product }) => {
  // Dynamically extract FAQ pairs from product
  const faqs = Object.keys(product)
    .filter((key) => key.toLowerCase().startsWith("faq") && key.toLowerCase().endsWith("q"))
    .map((qKey) => {
      const index = qKey.match(/\d+/)?.[0]; // get number in key, e.g., Faq1Q -> 1
      const aKey = `fAQ${index}A`; // corresponding answer key
      return { q: product[qKey], a: product[aKey] };
    })
    .filter((f) => f.q && f.a); // only include FAQs with both question & answer

  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs.length) return null;

  const sectionStyle = {
    width: "100%",
    backgroundColor: "#f9f6f3",
    padding: "60px 0",
  };

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 24px",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "32px",
  };

  const faqItemStyle = {
    borderBottom: "1px solid #ddd",
    padding: "16px 0",
    cursor: "pointer",
  };

  const questionStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "500",
  };

  const answerWrapperStyle = (isOpen) => ({
    maxHeight: isOpen ? "500px" : "0px",
    overflow: "hidden",
    transition: "max-height 0.4s ease",
  });

  const answerStyle = {
    marginTop: "12px",
    color: "#555",
    lineHeight: "1.6",
  };

  return (
    <div style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Questions? We’ve Got You Covered</h2>

        <div>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={faqItemStyle}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div style={questionStyle}>
                <span>{faq.q}</span>
                <span>{openIndex === idx ? "▲" : "▼"}</span>
              </div>
              <div style={answerWrapperStyle(openIndex === idx)}>
                <p style={answerStyle}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFAQ;
