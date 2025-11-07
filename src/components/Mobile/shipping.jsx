import React, { useEffect, useState } from 'react';
import WhyChooseBanner from './WhyChooseBanner';

const FreeShippingBadge = () => {
  const [index, setIndex] = useState(0);

  const messages = [
    {
      icon: '🚀',
      title: 'Fast Delivery',
      sub: 'Within 7 days',
      bg: 'linear-gradient(135deg, #42a5f5, #478ed1)',
    },
    {
      icon: '🔁',
      title: 'Free Returns',
      sub: 'Up to 90 days',
      bg: 'linear-gradient(135deg, #fbc02d, #f57c00)',
    },
    {
      icon: '🔒',
      title: 'Secure Checkout',
      sub: '100% protected',
      bg: 'linear-gradient(135deg, #66bb6a, #388e3c)',
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
     <>
    <div
      style={{
        margin: '15px 10px 10px 10px',
        padding: '10px 16px',
        borderRadius: '16px 16px 0 0',
        background: '#f5e3d9e7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 8px 25px rgba(0,0,0,0.07)',
        fontFamily: 'Segoe UI, sans-serif',
        overflow: 'hidden',
        maxWidth: '100%',
        gap: '16px',
      }}
    >
      {/* Left Static */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '600', color: '#2e7d32', fontSize: '15px' }}>
          ✅ Free Shipping
        </div>
        <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>
          On unlimited orders
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: '1px',
          height: '40px',
          backgroundColor: '#999',
          opacity: 0.4,
          flexShrink: 0,
        }}
      ></div>

      {/* Right Animated */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          height: '55px',
          overflow: 'hidden',
          borderRadius: '10px',
          minWidth: 0,
        }}
      >
        {messages.map((msg, i) => {
          const active = i === index;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                transform: `translateY(${active ? '0%' : '100%'})`,
                transition: 'transform 0.5s ease-in-out',
                background: msg.bg,
                color: 'white',
                padding: '8px 12px',
                borderRadius: '10px 10px 0 0 ',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                zIndex: active ? 1 : 0,
              }}
            >
              <div style={{ fontWeight: '600', fontSize: '14px' }}>
                {msg.icon} {msg.title}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>{msg.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
    <WhyChooseBanner/>
   </>
  );
};

export default FreeShippingBadge;
