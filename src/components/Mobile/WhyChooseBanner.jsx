import React, { useEffect, useState } from 'react';

const details = {
  'Safe payments': {
    description: 'Your transactions are secured with encrypted payment gateways.',
    image: 'https://via.placeholder.com/150?text=Safe+Payments',
  },
  'Free returns': {
    description: 'Return your items within 30 days without any hassle.',
    image: 'https://via.placeholder.com/150?text=Free+Returns',
  },
  '24/7 support': {
    description: 'Our team is available around the clock to assist you.',
    image: 'https://via.placeholder.com/150?text=24/7+Support',
  },
  'Secure checkout': {
    description: 'Your personal info and card details are fully protected.',
    image: 'https://via.placeholder.com/150?text=Secure+Checkout',
  },
  'Buyer protection': {
    description: 'We’ve got your back if something goes wrong with your order.',
    image: 'https://via.placeholder.com/150?text=Buyer+Protection',
  },
};

const WhyChooseBanner = () => {
  const rightTexts = Object.keys(details);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % rightTexts.length);
        setFade(true); // fade in new text
      }, 400); // fade duration matches transition time
    }, 5000);

    return () => clearInterval(interval);
  }, [rightTexts.length]);

  const handleClick = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          backgroundColor: '#138000',
          borderRadius: '8px',
          margin: '10px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          fontFamily: 'Segoe UI, sans-serif',
          fontSize: '14px',
          maxWidth: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {/* Left side */}
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: '600' }}>
          <span
            style={{
              backgroundColor: 'white',
              color: '#138000',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px',
            }}
          >
            ✓
          </span>
          Why choose Store1920
        </div>

        {/* Right side text with fade animation */}
        <div
          style={{
            minWidth: '130px',
            textAlign: 'right',
            fontWeight: 400,
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.4s ease-in-out',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {rightTexts[index]}
            <span style={{ fontSize: '12px', marginLeft: '4px' }}>›</span>
          </span>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          onClick={closePopup}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '90%',
              maxWidth: '400px',
              textAlign: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            }}
          >
            <h3>{rightTexts[index]}</h3>
            <img
              src={details[rightTexts[index]].image}
              alt={rightTexts[index]}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
            />
            <p>{details[rightTexts[index]].description}</p>
            <button
              onClick={closePopup}
              style={{
                backgroundColor: '#138000',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                marginTop: '10px',
                cursor: 'pointer',
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WhyChooseBanner;
