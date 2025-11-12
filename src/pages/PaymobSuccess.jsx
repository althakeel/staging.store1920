// src/pages/PaymobSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function PaymobSuccess() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const orderId = searchParams.get('order_id');
      const paymentToken = searchParams.get('payment_token');

      if (!orderId || !paymentToken) {
        setError('Invalid payment data.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post('https://db.store1920.com/wp-json/custom/v1/paymob-verify', {
          order_id: orderId,
          payment_token: paymentToken,
        });
        if (res.data.success) {
          navigate(`/order-success?order_id=${orderId}`);
        } else {
          setError('Payment verification failed.');
        }
      } catch (err) {
        console.error(err);
        setError('Error verifying payment.');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  if (loading) return <div>Verifying payment, please wait...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return null;
}
