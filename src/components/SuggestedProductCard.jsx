// SuggestedProductCard.jsx
import React from 'react';

export default function SuggestedProductCard({ product }) {
  return (
    <div className="relatedProductCard">
      <img
        src={product.image || product.images?.[0]?.src || ''}
        alt={product.name}
        className="relatedProductImage"
      />
      <h4 className="relatedProductName">{product.name}</h4>
      <p className="relatedProductPrice">${Number(product.price).toFixed(2)}</p>
    </div>
  );
}
