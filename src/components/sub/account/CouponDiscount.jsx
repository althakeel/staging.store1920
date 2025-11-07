import React, { useState } from 'react';
import axios from 'axios';

export default function CouponDiscount({ onApplyCoupon }) {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [discountData, setDiscountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setMessage('Please enter a coupon code.');
      setDiscountData(null);
      setIsValid(false);
      onApplyCoupon(null);
      return;
    }

    setLoading(true);
    setMessage('');
    setDiscountData(null);
    setIsValid(false);

    try {
      const formData = new FormData();
      formData.append('coupon_code', couponCode.trim());

      const response = await axios.post('/wp-admin/admin-ajax.php?action=check_coupon', formData);

      if (response.data.success) {
        const data = response.data.data;
        setDiscountData(data);
        setMessage(`Coupon applied! Discount: ${data.amount}${data.discount_type === 'percent' ? '%' : ''}`);
        setIsValid(true);
        onApplyCoupon && onApplyCoupon(data);
      } else {
        setMessage(response.data.data || 'Invalid coupon code.');
        setIsValid(false);
        onApplyCoupon(null);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error checking coupon. Please try again.');
      setIsValid(false);
      onApplyCoupon(null);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 350, margin: '1rem auto', fontFamily: "'Montserrat', sans-serif", fontSize: '13px' }}>
      <div style={{ display: 'flex', gap: '6px' }}>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={e => setCouponCode(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
          disabled={loading}
          style={{
            flexGrow: 1,
            padding: '8px 12px',
            fontSize: '13px',
            borderRadius: '5px',
            border: isValid ? '1.8px solid #dd5e14ff' : '1.8px solid #bbb',
            outline: 'none',
            transition: 'border-color 0.25s',
            boxShadow: isValid ? '0 0 5px #dd5e14ff' : 'none',
            textTransform: 'uppercase',
          }}
        />
        <button
          onClick={handleApplyCoupon}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: loading ? '#a0aec0' : '#dd5e14ff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '13px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.25s',
          }}
        >
          {loading ? 'Checking...' : 'Apply'}
        </button>
      </div>

      <div
        style={{
          marginTop: '10px',
          padding: '8px 12px',
          borderRadius: '5px',
          color: isValid ? '#004085' : '#000',
          backgroundColor: isValid ? '#cce5ff' : '#f3b49bff',
          border: `1px solid ${isValid ? '#b8daff' : '#f3b49bff'}`,
          fontWeight: '600',
          minHeight: '32px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {message || 'Enter a coupon code to see discount.'}
      </div>

      {discountData && isValid && (
        <div
          style={{
            marginTop: '12px',
            padding: '10px 14px',
            backgroundColor: '#d0e9ff',
            border: '1px solid #4a90e2',
            borderRadius: '5px',
            color: '#004085',
            fontWeight: '700',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          {discountData.discount_type === 'percent'
            ? `${discountData.amount}% OFF`
            : `$${discountData.amount} OFF`}
        </div>
      )}
    </div>
  );
}
