// src/components/ProductBadges.js
import React, { useState, useEffect } from 'react';
import '../../assets/styles/ProductBadges.css'; // optional, for styling

const badgeLabels = {
  best_seller: 'Best Seller',
  recommended: 'Recommended',
  new_arrival: 'New Arrival',
  limited_offer: 'Limited Offer',
};

const BADGES_TO_SHOW = ['best_seller', 'recommended', 'new_arrival', 'limited_offer'];

const ProductBadges = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BADGES_TO_SHOW.length);
    }, 600000); // 10 minutes

    return () => clearInterval(timer);
  }, []);

  const currentBadge = BADGES_TO_SHOW[currentIndex];

  return (
    <div
      className="product-badges"
      style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
    >
      <span
        className={`badge badge-${currentBadge}`}
        style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', lineHeight: 1.2 }}
      >
        {badgeLabels[currentBadge] || currentBadge}
      </span>
      <span style={{ color: '#555', fontSize: '12px' }}>from this seller</span>
    </div>
  );
};

export default ProductBadges;
