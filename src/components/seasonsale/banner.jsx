import React from 'react';
import Seasonbanner from '../../assets/images/seasontitle/Banners Halloween 3.webp'

export default function SeasonSaleBanner() {
  return (
    <div
      style={{
        width: '100%',
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2D1B69 50%, #1A1A1A 100%)',
        boxSizing: 'border-box',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
          width: '100%',
          padding: '0 15px',
        }}
      >
        <img
          src={Seasonbanner}
          alt="Season Sale Banner"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            maxWidth: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `
              <div style="
                padding: 60px 20px;
                text-align: center;
                background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
                color: white;
                font-family: Arial, sans-serif;
                border-radius: 8px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
              ">
                <h1 style="margin: 0; font-size: 3rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">� HALLOWEEN SALE �</h1>
                <p style="margin: 15px 0 0 0; font-size: 1.4rem; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Spooky Savings Up to 70% OFF!</p>
              </div>
            `;
          }}
        />
      </div>
      
      {/* Full width background overlay for extra effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(26,26,26,0.1) 0%, rgba(45,27,105,0.05) 50%, rgba(26,26,26,0.1) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </div>
  );
}