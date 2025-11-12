import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";

const Bundle = ({ product, bundles, selected, setSelected }) => {
  const [variants, setVariants] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { addToCart } = useCart();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Load and render TabbyCard (Full Width)
  useEffect(() => {
    if (!bundles[selected]) return;
    const priceNum = parseFloat(bundles[selected].price) || 0;

    const loadTabby = () => {
      if (window.TabbyCard) {
        new window.TabbyCard({
          selector: "#tabbyProductCard",
          currency: "AED",
          price: priceNum.toFixed(2),
          lang: "en",
          shouldInheritBg: false,
          publicKey: "pk_test_019a4e3b-c868-29ff-1078-04aec08847bf",
          merchantCode: "Store1920",
          style: {
            width: "100%", // ✅ ensures full width
          },
        });
      }
    };

    if (!document.getElementById("tabby-product-card-js")) {
      const script = document.createElement("script");
      script.src = "https://checkout.tabby.ai/tabby-card.js";
      script.id = "tabby-product-card-js";
      script.onload = loadTabby;
      document.body.appendChild(script);
    } else {
      loadTabby();
    }
  }, [selected, bundles]);

  // Handle variant selection
  const handleVariantChange = (bundleIndex, productIndex, color) => {
    setVariants((prev) => ({
      ...prev,
      [`${bundleIndex}-${productIndex}`]: color,
    }));
  };

  // Format price
  const formatAED = (value) => `AED ${value.toFixed(2)}`;

  // Handle Buy Now click
  const handleBuyNow = () => {
    const bundle = bundles[selected];
    const bundleImage = bundle.image || bundle.images?.[0] || bundle.productImage || null;

    const bundleToCart = {
      id: bundle.wooId || bundle.id || 0,
      name: bundle.type,
      price: bundle.price,
      originalPrice: bundle.originalPrice,
      quantity: 1,
      variation: variants,
      image: bundleImage,
    };

    addToCart(bundleToCart, false);

    const query = new URLSearchParams({
      type: bundleToCart.name,
      price: bundleToCart.price,
      quantity: bundleToCart.quantity,
      image: bundleImage,
    });

    window.location.href = `/checkout?${query.toString()}`;
  };

  return (
    <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
      {/* Bundles */}
      {bundles.map((bundle, index) => {
        const totalSavings = bundle.originalPrice - bundle.price;
        const isSelected = selected === index;

        return (
          <div
            key={index}
            style={{
              borderRadius: "12px",
              border: isSelected ? "2px solid #e17a7a" : "1px solid #ddd",
              background: isSelected ? "#fff8f8" : "#fff",
              padding: "16px",
              marginBottom: "16px",
              position: "relative",
              transition: "all 0.2s ease",
            }}
          >
            {/* Most Popular Badge */}
            {bundle.mostPopular && (
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-2px",
                  background: "#d45a5a",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "bold",
                  padding: "4px 10px",
                  borderRadius: "0 0 0 6px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                MOST POPULAR
              </div>
            )}

            {/* Bundle Info */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                marginBottom: "10px",
              }}
              onClick={() => setSelected(index)}
            >
              <div>
                <p style={{ fontWeight: 600, fontSize: "15px", margin: 0 }}>
                  {bundle.type}
                </p>
                {bundle.note && (
                  <p style={{ fontSize: "13px", color: "#777", margin: "2px 0" }}>
                    {bundle.note}
                  </p>
                )}
                <span
                  style={{
                    display: "inline-block",
                    background: "#f9e4e4",
                    color: "#b14b4b",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    marginTop: "4px",
                  }}
                >
                  You Save {formatAED(totalSavings)}
                </span>
              </div>

              {/* Price Section */}
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "#b95410",
                    margin: 0,
                  }}
                >
                  {formatAED(bundle.price)}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#999",
                    textDecoration: "line-through",
                    margin: 0,
                  }}
                >
                  {formatAED(bundle.originalPrice)}
                </p>
              </div>

              <input
                type="radio"
                name="bundle"
                checked={isSelected}
                onChange={() => setSelected(index)}
                style={{ marginLeft: "12px", accentColor: "#d45a5a" }}
              />
            </div>
          </div>
        );
      })}

      {/* ✅ Full-Width TabbyCard Widget */}
      <div style={{ width: "100%", margin: "18px 0" }}>
        <div
          id="tabbyProductCard"
          style={{
            width: "100%",
            maxWidth: "100%",
            display: "block",
          }}
        ></div>
      </div>

      {/* Buy Now Button */}
      <div
        style={{
          textAlign: "center",
          marginTop: isMobile ? "0" : "20px",
          position: isMobile ? "fixed" : "static",
          bottom: isMobile ? "0" : "auto",
          left: isMobile ? "0" : "auto",
          width: isMobile ? "100%" : "auto",
          background: isMobile ? "#fff" : "transparent",
          boxShadow: isMobile ? "0 -2px 8px rgba(0,0,0,0.1)" : "none",
          padding: isMobile ? "10px" : "0",
          zIndex: 999,
        }}
      >
        <button
          onClick={handleBuyNow}
          style={{
            background: "#d45a5a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            transition: "all 0.2s ease",
          }}
        >
          Buy Now – AED {bundles[selected]?.price.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default Bundle;
