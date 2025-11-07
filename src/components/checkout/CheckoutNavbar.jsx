import React, { useState, useEffect } from 'react';
import '../../assets/styles/checkout/CheckoutNavbar.css';
import LogoMain from '../../assets/images/Logo/3.webp'


const messages = [
  '✅ 30-day no delivery refund',
  '✅ Secure payments & checkout',
  '✅ Free returns within 30 days',
  '✅ 24/7 customer support',
];

const CheckoutNavbar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <nav className="checkout-navbar">
      <div className="checkout-navbar-inner">
        <div className="checkout-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img
            src={LogoMain}
            alt="Store1920"
            style={{ height: 40, borderRadius: 10 }}
          />
        </div>
        <div className="checkout-message fade-in-out">
          {/* <img
            src="https://db.store1920.com/wp-content/uploads/2025/07/notification.png"
            alt="Notification"
            style={{ width: 18, marginRight: 6 }}
          /> */}
          <span>{messages[currentIndex]}</span>
        </div>
      </div>
    </nav>
  );
};

export default CheckoutNavbar;
