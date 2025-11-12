import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceHolderImage from "../../assets/images/common/Placeholder.png";

const API_BASE = "https://db.store1920.com/wp-json/wc/v3/products";
const AUTH = {
  username: "ck_5441db4d77e2a329dc7d96d2db6a8e2d8b63c29f",
  password: "cs_81384d5f9e75e0ab81d0ea6b0d2029cba2d52b63",
};

const PurchasePopup = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [visible, setVisible] = useState(false);
  const [verifiedOrders, setVerifiedOrders] = useState(0);
  const [soldInTime, setSoldInTime] = useState(0);
  const [stockLeft, setStockLeft] = useState(0);
  const [showBadge, setShowBadge] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_BASE, {
          auth: AUTH,
          params: { per_page: 50 },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Popup logic
  useEffect(() => {
    if (products.length === 0) return;

    const showPopup = () => {
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];
      setProduct(randomProduct);

      // Random values
      setVerifiedOrders(Math.floor(Math.random() * 10) + 1);
      setSoldInTime(Math.floor(Math.random() * 100) + 10);
      setStockLeft(Math.floor(Math.random() * 22) + 3); // between 3–25 left
      setShowBadge(Math.random() > 0.5); // 50% chance badge shows

      setVisible(true);
      setTimeout(() => setVisible(false), 5000); // show 5 sec
    };

    showPopup();
    const interval = setInterval(showPopup, 15000); // every 15 sec
    return () => clearInterval(interval);
  }, [products]);

  if (!product || !visible) return null;

const truncate = (text = "", length) =>
  text.length > length ? text.substring(0, length) + "..." : text;


  return (
    <div
      style={{
        position: "fixed",
        bottom: "25px",
        left: "25px",
        width: "370px",
        display: "flex",
        alignItems: "center",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 10px 28px rgba(0,0,0,0.2)",
        padding: "14px",
        gap: "14px",
        zIndex: 1000,
        animation: "slideInOut 6s forwards",
        borderLeft: "6px solid #0a7d22",
        cursor: "pointer",
      }}
    >
      <style>
        {`
          @keyframes slideInOut {
            0% { transform: translateX(-120%); opacity: 0; }
            10% { transform: translateX(0); opacity: 1; }
            80% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(-120%); opacity: 0; }
          }
        `}
      </style>

      {/* Bigger product image */}
      <img
        src={product.images?.[0]?.src || PlaceHolderImage}
        alt={product.name}
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "12px",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      <div style={{ flex: 1 }}>
        <p
          style={{
            fontWeight: "700",
            fontSize: "15px",
            margin: "0 0 6px 0",
            color: "#111",
          }}
        >
          {truncate(product.name, 45)}
        </p>

        <p style={{ fontSize: "13px", color: "#444", margin: "0 0 4px 0" }}>
          🛒 {verifiedOrders} verified customer
          {verifiedOrders > 1 ? "s" : ""} bought this
        </p>

        <p style={{ fontSize: "13px", color: "#444", margin: "0 0 4px 0" }}>
          🔥 {soldInTime}+ sold in the last hour
        </p>

        <p style={{ fontSize: "13px", color: "#d32f2f", margin: "0 0 6px 0" }}>
          ⏳ Hurry! Only <b>{stockLeft}</b> left in stock
        </p>

        {showBadge && (
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: "600",
              color: "#fff",
              background: "#0a7d22",
              borderRadius: "20px",
              padding: "4px 10px",
            }}
          >
            ✅ Verified Customer
          </span>
        )}
      </div>
    </div>
  );
};

export default PurchasePopup;
