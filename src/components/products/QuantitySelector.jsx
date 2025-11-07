import React from 'react';
import '../../assets/styles/QuantitySelector.css';

export default function QuantitySelector({ quantity, setQuantity, maxQuantity }) {
  const validMax = Number.isInteger(maxQuantity) && maxQuantity > 0 ? maxQuantity : 99;
  const quantities = Array.from({ length: validMax }, (_, i) => i + 1);

  return (
    <div className="quantity-selector-container">
      <label htmlFor="quantity-select" className="quantity-label">Quantity:</label>
      <select
        id="quantity-select"
        className="quantity-select"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
      >
        {quantities.map((q) => (
          <option key={q} value={q}>
            {q}
          </option>
        ))}
      </select>

     {validMax <= 10 && (
  <p className="stock-info-text" aria-live="polite">
    Only {validMax} left in stock!
  </p>
)}
    </div>
  );
}
