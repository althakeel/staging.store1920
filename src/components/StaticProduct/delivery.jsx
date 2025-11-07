import React from "react";
import { FaStar, FaTruck, FaHeadset } from "react-icons/fa";

const DeliveryInfo = () => {
  const containerStyle = {
    maxWidth: "750px",
    margin: "20px auto",
    fontFamily: "'Montserrat', sans-serif",
    color: "#374151",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "left",
    justifyContent: "left",
    fontSize: "14px",
    marginBottom: "20px",
  };

  const iconRowStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
  };

  const iconStyle = {
    fontSize: "20px",
    marginBottom: "6px",
    color: "#c4a59a", // light brownish/pinkish tone like in your screenshot
  };

  const textStyle = {
    fontSize: "13px",
    color: "#111827",
  };

  return (
    <div style={containerStyle}>
      {/* Delivery Header */}
      <div style={headerStyle}>
        <FaTruck style={{ color: "#c4a59a", marginRight: "6px" }} />
        Arrives in <span style={{ margin: "0 4px", fontWeight: "500" }}>2 days</span>, if you order today
      </div>

      {/* Info Row */}
      <div style={iconRowStyle}>
        <div>
          <FaStar style={iconStyle} />
          <div style={textStyle}>12,319 Five Stars</div>
        </div>
        <div>
          <FaTruck style={iconStyle} />
          <div style={textStyle}>Fast & Easy Returns</div>
        </div>
        <div>
          <FaHeadset style={iconStyle} />
          <div style={textStyle}>24/7 VIP Support</div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
