import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymobCheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [iframeUrl, setIframeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const initPaymob = async () => {
      try {
        const res = await fetch('/wp-json/custom/v3/paymob-init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ order_id: orderId })
        });
        const data = await res.json();
        if (data.iframe_url) setIframeUrl(data.iframe_url);
        else setError('Unable to initialize Paymob.');
      } catch (err) {
        console.error(err);
        setError('Failed to load Paymob.');
      } finally {
        setLoading(false);
      }
    };
    if (orderId) initPaymob();
  }, [orderId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Complete Payment</h2>
      {loading && <p>Loading Paymob...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          title="Paymob Checkout"
          width="100%"
          height="600"
          style={{ border: 'none' }}
        />
      )}
    </div>
  );
};

export default PaymobCheckoutPage;
