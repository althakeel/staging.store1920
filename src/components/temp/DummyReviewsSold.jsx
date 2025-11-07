import React from 'react';

export default function DummyReviewsSold({ reviews = 120, rating = 4.5, sold = 75 }) {
  const starsArray = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      starsArray.push('full');
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      starsArray.push('half');
    } else {
      starsArray.push('empty');
    }
  }

  const renderStar = (type, index) => {
    switch (type) {
      case 'full':
        return (
          <svg
            key={index}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#ffcc00"
            stroke="#ffcc00"
            strokeWidth="2"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.176L12 18.896l-7.336 3.853 1.402-8.176-5.934-5.782 8.2-1.193z" />
          </svg>
        );
      case 'half':
        return (
          <svg
            key={index}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffcc00"
            strokeWidth="2"
          >
            <defs>
              <linearGradient id={`halfGrad${index}`}>
                <stop offset="50%" stopColor="#ffcc00" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.176L12 18.896l-7.336 3.853 1.402-8.176-5.934-5.782 8.2-1.193z"
              fill={`url(#halfGrad${index})`}
            />
          </svg>
        );
      default: // empty
        return (
          <svg
            key={index}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ccc"
            strokeWidth="2"
          >
            <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.176L12 18.896l-7.336 3.853 1.402-8.176-5.934-5.782 8.2-1.193z" />
          </svg>
        );
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '4px 0', fontSize: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ fontWeight: 'bold', color: '#000' }}>{rating.toFixed(1)}</span>
        <span style={{ display: 'flex', gap: '2px' }}>
          {starsArray.map((star, idx) => renderStar(star, idx))}
        </span>
        <span style={{ color: '#555', fontSize: '10px' }}>({reviews} reviews)</span>
    
        {/* <span
          style={{
            backgroundColor: '#4caf50',
            color: '#fff',
            fontSize: '8px',
            fontWeight: 'bold',
            padding: '1px 3px',
            borderRadius: '4px',
            marginLeft: '6px',
          }}
        >
          Trusted Reviews
        </span> */}
      </div>
      <div style={{ color: '#777', fontSize: '12px' }}>{sold} sold</div>
    </div>
  );
}
