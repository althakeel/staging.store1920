import React, { useEffect, useState } from 'react';
import '../../assets/styles/Mobile/MobileLightningdeals.css';
import { useNavigate } from 'react-router-dom';


const LtbnrBanner = () => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState('');

  const handleClick = () => {
    navigate('/lightningdeal');
  };

  useEffect(() => {
    // Define a list of random background colors
    const colors = ['#FF6B6B', '#00a2ffff', '#7610a5ff', '#00CFE8', '#7367F0', '#ff5507ff', '#E91E63'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }, []);

  return (
    <div className="ltbnr-banner" onClick={handleClick} style={{ backgroundColor: bgColor }}>
      <div className="ltbnr-content">
        <span className="ltbnr-icon">⚡</span>
        <strong className="ltbnr-title">Lightning deals</strong>
        <span className="ltbnr-subtitle">Limited time offer</span>
        <span className="ltbnr-arrow">›</span>
      </div>
    </div>
  );
};

export default LtbnrBanner;