import React, { useState, useEffect } from "react";
import DirhamIcon from "../../assets/images/Dirham 2.png";

const ProductInfo = ({ product }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 640;
  const isTablet = screenWidth > 640 && screenWidth <= 1024;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    margin: "0 10px",
    padding: isMobile ? "0 5px" : "0 16px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  };

  const nameStyle = {
    fontSize: isMobile ? "15px" : isTablet ? "18px" : "20px",
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.2,
  };

  const priceRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  };

  const salePriceStyle = {
    fontSize: isMobile ? "16px" : isTablet ? "18px" : "28px",
    fontWeight: 700,
    color: "#dc6626",
    margin: 0,
    display: "flex",
    alignItems: "center",
  };

  const decimalStyle = {
    fontSize: isMobile ? "12px" : isTablet ? "14px" : "18px",
    marginLeft: "2px",
    alignSelf: "flex-start",
  };

  const regularPriceStyle = {
    fontSize: isMobile ? "14px" : isTablet ? "16px" : "18px",
    color: "#6B7280",
    textDecoration: "line-through",
    margin: 0,
    display: "flex",
    alignItems: "center",
  };

  const badgeStyle = {
    backgroundColor: "#10B981",
    color: "#fff",
    fontSize: isMobile ? "12px" : "14px",
    fontWeight: "bold",
    padding: "4px 8px",
    borderRadius: "15px 0 15px 0",
  };

  const descStyle = {
    fontSize: isMobile ? "14px" : isTablet ? "15px" : "16px",
    color: "#1F2937",
    margin: "0",
  };

  // Calculate discount %
  const discountPercent =
    product.regularPrice && product.salePrice && product.salePrice < product.regularPrice
      ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
      : null;

  // Helper to split integer and decimal
  const formatPrice = (price) => {
    const [integer, decimal] = Number(price).toFixed(2).split(".");
    return { integer, decimal };
  };

  // Price display component
  const PriceDisplay = ({ price, style }) => {
    const { integer, decimal } = formatPrice(price);
    return (
      <p style={style}>
        <img
          src={DirhamIcon}
          alt="AED"
          style={{
            width: isMobile ? "15px" : "18px",
            height: isMobile ? "15px" : "18px",
            objectFit: "contain",
            marginRight: "4px",
            verticalAlign: "middle",
          }}
        />
        {integer}
        <span style={decimalStyle}>.{decimal}</span>
      </p>
    );
  };

  // Gather subdescriptions
  const subDescs = ["subdesc", "subdesc1", "subdesc2", "subdesc3", "subdesc4"]
    .map((key) => product[key])
    .filter(Boolean);

  return (
    <div style={containerStyle}>
      {/* Product Name */}
      {product.name && <h1 style={nameStyle}>{product.name}</h1>}

      {/* Description */}
      {product.description && (
        <p style={{ ...descStyle, marginTop: "-5px", fontSize: isMobile ? "13px" : descStyle.fontSize }}>
          {product.description}
        </p>
      )}

      {/* Price Row */}
      <div style={priceRowStyle}>
        {discountPercent !== null ? (
          <>
            <PriceDisplay price={product.salePrice} style={salePriceStyle} />
            <PriceDisplay price={product.regularPrice} style={regularPriceStyle} />
            <span style={badgeStyle}>{discountPercent}% OFF</span>
          </>
        ) : (
          product.price && <PriceDisplay price={product.price} style={salePriceStyle} />
        )}
      </div>

      {/* Short description */}
      {/* {product.shortdesc && (
        <p style={{ ...descStyle, marginTop: "-5px", fontSize: isMobile ? "13px" : descStyle.fontSize }}>
          {product.shortdesc}
        </p>
      )} */}

      {/* Sub-descriptions (only if any exist) */}
{Array.isArray(subDescs) && subDescs.filter(Boolean).length > 0 && (
  <ul
    style={{
      listStyleType: "none",
      padding: "5px 20px",
      margin: 0,
      fontFamily: "Montserrat, sans-serif",
      borderRadius: "8px",
      maxWidth: "400px",
    }}
  >
    {subDescs
      .filter(text => text && text.trim() !== "") // remove empty or whitespace-only strings
      .map((text, idx) => (
        <li
          key={idx}
          style={{ padding: "5px 0", color: "#333", fontWeight: 500 }}
        >
          <span
            style={{
              color: "darkgreen",
              marginRight: "8px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            ✓
          </span>
          {text}
        </li>
      ))}
  </ul>
)}
    </div>
  );
};

export default ProductInfo;
