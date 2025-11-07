import React from 'react';

const Section5 = ({ product }) => {
  if (!product?.section5image) return null;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <img
        src={product.section5image}
        alt={product.name || "Product Image"}
        style={{
          width: '100%',
          maxWidth: '800px', // limits image size on large screens
          borderRadius: '15px',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default Section5;
