import React, { useEffect, useState } from 'react';

const PaymentMethods = ({ onMethodSelect }) => {
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await fetch('https://db.store1920.com/wp-json/wc/v3/payment_gateways', {
          headers: {
            Authorization: 'Basic ' + btoa('ck_XXX:cs_XXX') // Replace with your real WooCommerce API keys
          },
        });
        const data = await res.json();
        const enabledMethods = data.filter((method) => method.enabled);
        setMethods(enabledMethods);
      } catch (error) {
        console.error('Failed to load payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <div className="payment-methods">
      <h3>Select Payment Method</h3>
      {methods.map((method) => (
        <label key={method.id}>
          <input
            type="radio"
            name="paymentMethod"
            value={method.id}
            onChange={() => onMethodSelect(method)}
          />{' '}
          {method.title}
        </label>
      ))}
    </div>
  );
};

export default PaymentMethods;