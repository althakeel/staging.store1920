import React, { useState, useEffect } from 'react';

const BADGE_MAP = {
  below_price: { label: 'Below Comparable Price', style: { backgroundColor: '#ff9800', color: '#fff' } },
  almost_sold: { label: 'Almost Sold Out', style: { backgroundColor: '#e60023', color: '#fff' } },
  limited_time: { label: 'Limited Time Offer', style: { backgroundColor: '#0071e3', color: '#fff' } },
  lower_than_usual: { label: 'Price Lower Than Usual', style: { backgroundColor: '#009688', color: '#fff' } },
  best_recommended: { label: 'Best Recommended', style: { backgroundColor: '#4caf50', color: '#fff' } },
};

const BADGES_TO_SHOW = ['below_price', 'almost_sold', 'limited_time', 'lower_than_usual', 'best_recommended'];

// Helper to randomly pick 1 or 2 badges
function getRandomBadges() {
  const count = Math.random() < 0.5 ? 1 : 2; // 50% chance for 1 or 2 badges
  const shuffled = BADGES_TO_SHOW.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function SellerBadges() {
  const [badges, setBadges] = useState(getRandomBadges());
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;

  useEffect(() => {
    const timer = setInterval(() => {
      setBadges(getRandomBadges());
    }, 600000); // 10 minutes

    return () => clearInterval(timer);
  }, []);

  if (!badges || badges.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        marginBottom: '10px',
        justifyContent: 'flex-start',
      }}
    >
      {badges.map((key) => {
        const badge = BADGE_MAP[key];
        return (
          <span
            key={key}
            style={{
              padding: isMobile ? '4px 6px' : '4px 8px',
              borderRadius: '5px',
              fontSize: isMobile ? '10px' : '11px',
              fontWeight: 600,
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              ...badge.style,
            }}
          >
            {badge.label}
          </span>
        );
      })}
    </div>
  );
}
