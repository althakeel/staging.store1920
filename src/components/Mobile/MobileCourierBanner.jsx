import React, { useEffect, useState, useRef } from 'react';

const messages = [
  'Fast & Reliable Courier Service',
  'Track Your Orders in Real-Time',
  'Eco-Friendly & Sustainable Delivery',
  'Safe & Secure Handling of Packages',
];

const MobileCourierBanner = () => {
  const [bannerUrl, setBannerUrl] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const marqueeRef = useRef(null);

  useEffect(() => {
    fetch('https://db.store1920.com/wp-json/store1920/v1/banner')
      .then((res) => res.json())
      .then((data) => {
        if (data.banner_url) setBannerUrl(data.banner_url);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!bannerUrl || !isMobile) return null;

  // Keyframes for marquee animation
  const keyframes = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  return (
    <section
      style={{
        width: '100%',
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <style>{keyframes}</style>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '40px',
          backgroundColor: '#3b73ee',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => setShowPopup(true)}
      >
        <img
          src={bannerUrl}
          alt="Courier Banner"
          style={{
            height: '100%',
            width: 'auto',
            objectFit: 'cover',
            flexShrink: 0,
            marginRight: '10px',
          }}
        />

        <div
          style={{
            flexGrow: 1,
            overflow: 'hidden',
            position: 'relative',
            height: '100%',
          }}
        >
          <div
            ref={marqueeRef}
            style={{
              display: 'inline-flex',
              position: 'absolute',
              whiteSpace: 'nowrap',
              animation: 'marquee 15s linear infinite',
            }}
          >
            {[...messages, ...messages].map((msg, idx) => (
              <span
                key={idx}
                style={{
                  marginRight: '80px',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '14px',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                {msg}
              </span>
            ))}
          </div>
        </div>

        <span
          style={{
            fontSize: '18px',
            color: '#fff',
            marginLeft: '10px',
            userSelect: 'none',
          }}
        >
          ➔
        </span>
      </div>

      {showPopup && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '90%',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.5,
                marginBottom: '20px',
                color: '#333',
              }}
            >
              Temu is working with EMX to provide you with safe and fast delivery services while focusing on sustainable development, such as using pick up points and lockers.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                backgroundColor: '#ff5100',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MobileCourierBanner;
