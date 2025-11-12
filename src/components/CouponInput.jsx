// PATH: src/components/CouponInput.jsx
import React, { useState } from 'react';

function CouponInput({ subtotal, setDiscount }) {
  const [code, setCode]   = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    if (code.toLowerCase() === 'temu10') {
      setDiscount(subtotal * 0.10);
      setError('');
    } else {
      setDiscount(0);
      setError('Invalid coupon');
    }
  };

  return (
    <div className="couponBox">
      <label>Coupon code</label>
      <div className="row">
        <input
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(''); }}
          placeholder="e.g. TEMU10"
        />
        <button onClick={handleApply}>Apply</button>
      </div>
      {error && <small className="err">{error}</small>}
    </div>
  );
}

export default CouponInput;
