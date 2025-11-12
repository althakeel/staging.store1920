import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Clothing', slug: 'clothing' },
  { name: 'Beauty', slug: 'beauty' },
  { name: 'Home & Kitchen', slug: 'home-kitchen' },
];

const MobileSearchBar = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
    setShowSuggestions(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f8f8f8',
          borderRadius: '20px',
          padding: '8px 12px',
          border: '1px solid #e0e0e0',
          width: '100%',
          boxSizing: 'border-box',
        }}
        onClick={() => setShowSuggestions(true)}
      >
        <input
          type="text"
          placeholder="Search for produ..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '14px',
            color: '#333',
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <div
          style={{
            backgroundColor: '#004b93',
            color: 'white',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaSearch size={16} />
        </div>
      </div>

      {showSuggestions && (
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #eee',
            marginTop: '8px',
            borderRadius: '6px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            position: 'absolute',
            width: '100%',
            zIndex: 999,
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              style={{
                padding: '10px 14px',
                fontSize: '14px',
                cursor: 'pointer',
                borderBottom: '1px solid #f3f3f3',
              }}
              onMouseDown={(e) => e.preventDefault()} // prevent input blur before click
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileSearchBar;
