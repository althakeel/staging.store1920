import React, { useEffect, useState } from 'react';
import Imageicon1 from '../assets/images/minibanners/1.png'
import Imageicon2 from '../assets/images/minibanners/2.png'
import Imageicon3 from '../assets/images/minibanners/3.png'
import Imageicon4 from '../assets/images/minibanners/4.png'
import Imageicon5 from '../assets/images/minibanners/5.png'

// Offer data
const offers = [
  {
    image: Imageicon4,  // ← remove the curly braces
    text: 'Top picks at lower prices.',
    bg: '#49aec0',
  },
  {
    image: Imageicon5,
    text: 'Limited-time offer inside.',
    bg: '#ffc300',
  },
  {
    image: Imageicon3,
    text: 'Save big on last items now.',
    bg: '#49aec0',
  },
  {
    image: Imageicon2,
    text: 'Grab the best deal today.',
    bg: '#131723',
  },
  {
    image: Imageicon1,
    text: 'New drops for this season.',
    bg: '#cf0101',
  },
];

// Utility to determine if text color should be white or black
const isDarkColor = (hex) => {
  if (!hex) return false;
  const rgb = parseInt(hex.replace('#', ''), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 128;
};

const OfferBox = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
        setIsAnimating(false);
      }, 400);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentOffer = offers[currentIndex];

  // Styles
  const containerStyle = {
    backgroundColor: currentOffer.bg,
    color: isDarkColor(currentOffer.bg) ? '#fff' : '#000',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    fontFamily: 'Montserrat, sans-serif',
    padding: 0,
    boxSizing: 'border-box',
    overflow: 'hidden',
    transition: 'background-color 0.6s ease, color 0.6s ease',
  };

  const imageStyle = {
    width: 135,
    objectFit: 'cover',
    flexShrink: 0,
    borderRadius: 0,
    transition: 'opacity 0.4s ease, transform 0.4s ease',
    opacity: isAnimating ? 0 : 1,
    transform: isAnimating ? 'translateX(-20px)' : 'translateX(0)',
  };

  const textStyle = {
    flexGrow: 1,
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1.3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
    opacity: isAnimating ? 0 : 1,
    transform: isAnimating ? 'translateX(-20px)' : 'translateX(0)',
  };

  return (
    <div className="offer-box" style={containerStyle}>
      <img
        src={currentOffer.image}
        alt={currentOffer.text}
        className={isAnimating ? 'animating' : ''}
        style={imageStyle}
      />
      <div
        className={`offer-text ${isAnimating ? 'animating' : ''}`}
        style={textStyle}
      >
        {currentOffer.text}
      </div>
    </div>
  );
};

export default OfferBox;
