import React from 'react';
import '../../../assets/styles/CourierBanner.css';
import Banner from '../../../assets/images/seasontitle/17.webp'

const messages = [
  'Fast & Reliable Courier Service',
  'Track Your Orders in Real-Time',
  'Eco-Friendly & Sustainable Delivery',
  'Safe & Secure Handling of Packages',
];

const CourierBanner = () => {
  return (
    <section className="courier-banner-section">
      <div className="banner-content">
        <img className="banner-image" src={Banner} alt="Courier Banner" />
        <div className="banner-overlay">
          <div className="marquee-wrapper">
            <div className="marquee">
              {messages.map((msg, idx) => (
                <span className="marquee-item" key={idx}>
                  {msg}
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {messages.map((msg, idx) => (
                <span className="marquee-item" key={`dup-${idx}`}>
                  {msg}
                </span>
              ))}
            </div>
          </div>
          <div className="banner-arrow">➔</div>
        </div>
      </div>
