import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymobCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Processing payment...');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get('order_id');
    const status = query.get('status'); // e.g., 'success' or 'failed'

    if (!orderId) {
      setMessage('Invalid payment callback.');
      return;
    }

    if (status === 'success') {
      navigate(`/order-success?order_id=${orderId}`);
    } else {
      // Optionally fetch updated order from WooCommerce to confirm status
      setMessage('Payment failed. Please try again.');
    }
  }, [location, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>{message}</h2>
      <button onClick={() => navigate('/checkout')}>Back to Checkout</button>
    </div>
  );
}
