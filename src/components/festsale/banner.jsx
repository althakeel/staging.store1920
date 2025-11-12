import React, { useState, useEffect } from 'react';

const SALE_BANNER_API = 'https://db.store1920.com/wp-json/custom/v1/sale-banner';

export default function SaleBanner() {
  const [bannerData, setBannerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(SALE_BANNER_API)
      .then(async (res) => {
        const text = await res.text();
        if (!text) throw new Error('Empty response from banner API');
        return JSON.parse(text);
      })
      .then(data => setBannerData(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return (
    <div style={{ textAlign: 'center', padding: 20, fontFamily: 'Arial, sans-serif', color: '#333' }}>
      Error loading banner: {error}
    </div>
  );
  if (!bannerData) return (
    <div style={{ textAlign: 'center', padding: 20, fontFamily: 'Arial, sans-serif', color: '#333' }}>
      Loading banner...
    </div>
  );

  return (
    <div
      style={{
        width: '100%',
        background: `linear-gradient(to right, ${bannerData.bg_left}, ${bannerData.bg_right})`,

        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          // padding: '0 15px',
          boxSizing: 'border-box',
          // No backgroundColor here, keep transparent so gradient shows outside container edges
          backgroundColor: 'transparent',
        }}
      >
        <img
          src={bannerData.desktop}
          alt="Sale Banner"
          style={{
            display: 'block',
            width: '100%',       // fill container width fully (max 1400px)
            maxHeight: 300,
            height: 'auto',
            objectFit: 'contain',
            margin: '0 auto',
          }}
        />
      </div>
    </div>
  );
}
