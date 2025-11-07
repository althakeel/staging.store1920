import React, { useState, useEffect } from "react";
import { FaTruck, FaClipboardCheck, FaGift } from "react-icons/fa";
import "../assets/styles/TopBar.css";
import { useCart } from '../contexts/CartContext';

export default function TopBar() {
  const [popup, setPopup] = useState(null);
  const [popupPosition, setPopupPosition] = useState("center");
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { isCartOpen } = useCart();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      subtitle: "Special for you",
      color: "#28a745",
      type: "shipping",
    },
    {
      icon: <FaClipboardCheck />,
      title: "Delivery Guarantee",
      subtitle: "Refund for any issues",
      color: "#ffc107",
      type: "returns",
    },
    {
      icon: <FaGift />,
      title: "Signup Rewards",
      subtitle: "100 Coins + Free Coupons",
      color: "#e63946",
      type: "signup",
    },
  ];

  const rotatingMessages = [
    <>Up to 90 days*<br />Price adjustment</>,
    <>Within 30 days<br />Free returns Up to 90 days*</>,
  ];

  // Countdown (24 hours)
  useEffect(() => {
    const targetTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;
      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Rotate center messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % rotatingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlePopup = (item, position = "center") => {
    setPopup(item);
    setPopupPosition(position);
  };
  const closePopup = () => setPopup(null);

  const renderPopupContent = () => {
    if (!popup) return null;
    switch (popup.type) {
      case "signup":
        return (
          <>
            <h2>🎁 Sign Up & Get Rewards</h2>
            <p>Join Store1920 today and claim your exclusive benefits:</p>
            <ul className="popup-list">
              <li>💰 <strong>100 Free Coins</strong> instantly</li>
              <li>🎟 <strong>Exclusive Coupons</strong> for your first order</li>
              <li>⚡ <strong>Limited-time Bonus</strong> if you sign up today</li>
            </ul>
            <div className="countdown-box">
              <p className="countdown-title">Offer ends in:</p>
              <div className="countdown-timer">
                <div>
                  <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                  <small>Hours</small>
                </div>
                <div>
                  <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <small>Min</small>
                </div>
                <div>
                  <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <small>Sec</small>
                </div>
              </div>
            </div>
            <div className="extra-box">
              <h3>Bonus Offers</h3>
              <p>🎁 Free gift wrapping on your first 3 orders</p>
              <p>🔖 Monthly special promo codes</p>
            </div>
          </>
        );
      case "returns":
        return (
          <>
            <h2>Delivery Guarantee</h2>
            <p>Shop with confidence — we’ve got you covered:</p>
            <ul className="popup-list">
              <li>✅ Refund issued within 2-3 days</li>
              <li>✅ 15-day easy return policy</li>
              <li>✅ Exchange options available</li>
            </ul>
            <div className="extra-box">
              <h3>Tips</h3>
              <p>📦 Track your returns easily via your account</p>
              <p>⏱ Refund processed within 48 hours after approval</p>
            </div>
          </>
        );
      case "shipping":
  return (
    <>
      <h2>Free Shipping</h2>
      <p>Enjoy fast and reliable delivery from our UAE warehouse:</p>
      <ul className="popup-list">
        <li>🚚 Free on orders over AED 100</li>
        <li>⚡ Same-day delivery available</li>
        <li>🌍 International shipping supported</li>
        <li>📦 Carefully packed to avoid damage</li>
        <li>🛡 Insurance included for high-value items</li>
        <li>📲 Real-time tracking for every shipment</li>
      </ul>

      {/* Extra Benefits Box */}
      <div
        style={{
          background: "#f9f9f9",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          marginTop: "15px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
        }}
      >
        <h3 style={{ marginTop: 0 }}>✨ Extra Benefits</h3>
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          <li>🎁 Special gift packaging on request</li>
          <li>⚡ Priority handling for VIP members</li>
          <li>💨 Express delivery upgrade at checkout</li>
          <li>🔄 Easy rescheduling if you’re not home</li>
        </ul>
      </div>

      {/* Tips Box */}
      <div
        style={{
          background: "#fff7e6",
          border: "1px solid #f5c76d",
          borderRadius: "10px",
          padding: "15px",
          marginTop: "15px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
        }}
      >
        <h3 style={{ marginTop: 0 }}>💡 Tips for Smooth Delivery</h3>
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          <li>✅ Keep your address updated in your account</li>
          <li>✅ Enable SMS notifications for quick updates</li>
          <li>✅ Contact support for urgent requests</li>
        </ul>
      </div>
    </>
  );

      default:
        return <p>No details available</p>;
    }
  };

  return (
    <>
      <div
        className="topbar-wrapper"
        style={{
          width: isMobile ? "100%" : isCartOpen ? "calc(100% - 250px)" : "100%",
          transition: "width 0.3s ease",
        }}
      >
        <div className="topbar-container">
          {/* First Item */}
          <div
            className="topbar-col clickable"
            style={{ color: messages[0].color }}
            onClick={() => handlePopup(messages[0], "left")}
          >
            {messages[0].icon}
            <div className="text-box">
              <div className="title">{messages[0].title}</div>
              <div className="subtitle">{messages[0].subtitle}</div>
            </div>
          </div>

          <div className="pipe-divider"></div>

          {/* Second Item - Rotating Text */}
          <div className="topbar-col topbar-center">
            <div className="slide-wrapper">
              <div key={currentMessageIndex} className="topbar-center-item fade-in">
                {rotatingMessages[currentMessageIndex]}
              </div>
            </div>
          </div>

          <div className="pipe-divider"></div>


 
{/* Third Item */}
{/* Third Item */}
{/* Third Item */}
<div
  className="topbar-col clickable"
  style={{ color: messages[1].color }}
  onClick={() => handlePopup(messages[1])}
>
  {/* {messages[1].icon} */}
  <span style={{ fontWeight: "700", marginLeft: "4px", fontSize:"20px" }}>Hurry Up !</span>
  <div className="text-box" style={{ alignItems: "center", marginTop: "2px" }}>
    {/* Compact bold countdown */}
    <div style={{ display: "flex", gap: "6px", fontSize: "17px", fontWeight: "700" }}>
      <div style={{ textAlign: "center" }}>
        {String(timeLeft.hours).padStart(2, "0")}
        <div style={{ fontSize: "9px", fontWeight: "400" }}>Hrs</div>
      </div>
      <span>:</span>
      <div style={{ textAlign: "center" }}>
        {String(timeLeft.minutes).padStart(2, "0")}
        <div style={{ fontSize: "9px", fontWeight: "400" }}>Min</div>
      </div>
      <span>:</span>
      <div style={{ textAlign: "center" }}>
        {String(timeLeft.seconds).padStart(2, "0")}
        <div style={{ fontSize: "9px", fontWeight: "400" }}>Sec</div>
      </div>
    </div>
  </div>
</div>



          <div className="pipe-divider"></div>

          {/* Fourth Item */}
          <div
            className="topbar-col clickable"
            style={{ color: messages[2].color }}
            onClick={() => handlePopup(messages[2])}
          >
            {messages[2].icon}
            <div className="text-box">
              <div className="title">{messages[2].title}</div>
              <div className="subtitle">{messages[2].subtitle}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {popup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className={`popup-content ${popupPosition === "left" ? "left-popup" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close" onClick={closePopup}>✖</button>
            <div className="popup-body">{renderPopupContent()}</div>
            <div className="popup-footer">
              <button className="ok-btn" onClick={closePopup}>OK</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
