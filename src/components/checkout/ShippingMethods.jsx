import React, { useEffect, useState } from 'react';
import '../../assets/styles/checkout/ShippingMethods.css';

const ShippingMethods = ({ selectedMethodId, onSelect }) => {
  const [methods] = useState([
    {
      id: 'free_shipping',
      title: 'Free Shipping',
      description: 'Delivered within 2–5 business days',
      cost: 0,
      eligible: true,
    },
  ]);

  // Auto-select Free Shipping by default
  useEffect(() => {
    if (methods.length > 0 && !selectedMethodId) {
      onSelect(methods[0].id);
    }
  }, [methods, selectedMethodId, onSelect]);

  return (
    <div className="shipping-container-full">
      <h3 className="shipping-title-full">Choose Shipping Method</h3>
      <form>
        {methods.map(method => {
          const isSelected = selectedMethodId === method.id;
          const price = method.cost > 0 ? `AED ${method.cost.toFixed(2)}` : 'Free';

          return (
            <label
              key={method.id}
              className={`shipping-full-card ${isSelected ? 'shipping-full-selected' : ''} ${
                method.eligible === false ? 'shipping-disabled' : ''
              }`}
            >
              <input
                type="radio"
                name="shippingMethod"
                value={method.id}
                checked={isSelected}
                onChange={() => method.eligible !== false && onSelect(method.id)}
                className="shipping-full-radio"
                disabled={method.eligible === false}
              />
              <div className="shipping-full-content">
                <div className="shipping-full-text">
                  <span className="shipping-full-title">{method.title}</span>
                  <div className="shipping-full-desc">{method.description}</div>
                </div>
                <span className="shipping-full-price">{price}</span>
              </div>
            </label>
          );
        })}
      </form>
    </div>
  );
};

export default ShippingMethods;
