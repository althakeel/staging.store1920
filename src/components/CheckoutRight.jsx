// src/components/checkout/CheckoutRight.jsx
import React, { useState, useEffect } from 'react';
import '../assets/styles/checkout/CheckoutRight.css';
import TrustSection from './checkout/TrustSection';
import CouponDiscount from './sub/account/CouponDiscount';
import CoinBalance from './sub/account/CoinBalace';
import Tabby from '../assets/images/Footer icons/3.webp'
import Tamara from '../assets/images/Footer icons/6.webp'

// -----------------------------
// Alert Component
// -----------------------------
function Alert({ message, type = 'info', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;
  const colors = { info: '#2f86eb', success: '#28a745', error: '#dc3545' };

  return (
    <div
      style={{
        padding: '12px 20px',
        marginBottom: '20px',
        backgroundColor: colors[type] || colors.info,
        color: '#fff',
        borderRadius: '4px',
        position: 'relative',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
      role="alert"
    >
      {message}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          right: '12px',
          top: '12px',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        ×
      </button>
    </div>
  );
}

// -----------------------------
// Utility: parse price safely
// -----------------------------
const parsePrice = (raw) => {
  if (typeof raw === 'object' && raw !== null) {
    raw = raw.price ?? raw.regular_price ?? raw.sale_price ?? 0;
  }
  const cleaned = String(raw).replace(/,/g, '').replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
};

// -----------------------------
// CheckoutRight Component
// -----------------------------
export default function CheckoutRight({ cartItems, formData, createOrder, clearCart, orderId }) {
  const [alert, setAlert] = useState({ message: '', type: 'info' });
  const [hoverMessage, setHoverMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [coinDiscount, setCoinDiscount] = useState(0);

  const showAlert = (message, type = 'info') => setAlert({ message, type });

  const itemsTotal = cartItems.reduce((acc, item) => {
    const price = parsePrice(item.prices?.price ?? item.price);
    const quantity = parseInt(item.quantity, 10) || 1;
    return acc + price * quantity;
  }, 0);

  const subtotal = Math.max(0, itemsTotal - discount - coinDiscount);
  const totalWithDelivery = subtotal;
  const amountToSend = Math.max(totalWithDelivery, 0.01);
  const hasCartItems = cartItems.some((item) => (parseInt(item.quantity, 10) || 0) > 0);

  const requiredFields = [
    'first_name',
    'last_name',
    'email',
    'phone_number',
    'street',
    'city',
    'country',
  ];
  const shippingOrBilling = formData.shipping || formData.billing || {};
  const isAddressComplete = requiredFields.every((f) => shippingOrBilling[f]?.trim());
  const canPlaceOrder = isAddressComplete && hasCartItems;

  // Capture order items
  const captureOrderItems = async (orderId, cartItems, customer) => {
    const items = cartItems.map((item) => ({
      id: item.wooId || item.id || 0,
      name: item.name || item.title,
      price: parseFloat(item.prices?.price ?? item.price ?? 0),
      quantity: parseInt(item.quantity, 10) || 1,
    }));

    await fetch('https://db.store1920.com/wp-json/custom/v1/capture-order-items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: orderId,
        customer: {
          first_name: customer.first_name,
          last_name: customer.last_name,
          email: customer.email,
          phone_number: customer.phone_number,
        },
        items,
      }),
    });
  };

  // -----------------------------
  // Place Order
  // -----------------------------
  const handlePlaceOrder = async () => {
    if (!hasCartItems) return showAlert('Your cart is empty.', 'error');
    if (!isAddressComplete) return showAlert('Please fill all required address fields.', 'error');
    if (!formData.paymentMethod) return showAlert('Select a payment method', 'error');
    setIsPlacingOrder(true);

    try {
      const id = orderId || (await createOrder());
      await captureOrderItems(id, cartItems, shippingOrBilling);

      // COD
      if (formData.paymentMethod === 'cod') {
        clearCart();
        window.location.href = `/order-success?order_id=${id.id || id}`;
        return;
      }

      // ✅ STRIPE FLOW
      if (formData.paymentMethod === 'stripe') {
        const normalized = {
          first_name: shippingOrBilling.first_name || 'First',
          last_name: shippingOrBilling.last_name || 'Last',
          email: shippingOrBilling.email || 'customer@example.com',
        };

        const payload = {
          amount: amountToSend,
          order_id: id.id || id,
          billing: normalized,
          frontend_success: window.location.origin + '/order-success',
        };

        try {
          const res = await fetch('https://db.store1920.com/wp-json/custom/v3/stripe-direct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          console.log('✅ Stripe Session =>', data);
          if (!res.ok || !data.checkout_url) {
            throw new Error(data.error || 'Failed to start Stripe session.');
          }
          window.location.href = data.checkout_url;
          return;
        } catch (err) {
          console.error('❌ STRIPE FETCH ERROR:', err);
          showAlert(err.message || 'Failed to initiate Stripe payment.', 'error');
        }
      }

      if (formData.paymentMethod === 'tabby') {
  const normalized = {
    first_name: shippingOrBilling.first_name || 'First',
    last_name:  shippingOrBilling.last_name  || 'Last',
    email:      shippingOrBilling.email      || 'customer@example.com',
    phone_number: shippingOrBilling.phone_number?.startsWith('+')
      ? shippingOrBilling.phone_number
      : `+${shippingOrBilling.phone_number || '971501234567'}`
  };

  const payload = {
    amount: amountToSend,
    order_id: id.id || id,
    billing: normalized
  };

  try {
    const res = await fetch('https://db.store1920.com/wp-json/custom/v1/tabby-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log('✅ Tabby Response =>', data);

    if (!res.ok || !data.checkout_url) {
      throw new Error(data.error || 'Failed to start Tabby session.');
    }

    window.location.href = data.checkout_url;
    return;
  } catch (err) {
    console.error('❌ TABBY ERROR:', err);
    showAlert(err.message || 'Failed to initiate Tabby payment.', 'error');
  }
}


      // ✅ PAYMOB / TABBY / TAMARA / CARD FLOW
      if (['paymob', 'card', 'tamara'].includes(formData.paymentMethod)) {
        const normalized = {
          first_name: shippingOrBilling.first_name?.trim() || 'First',
          last_name: shippingOrBilling.last_name?.trim() || 'Last',
          email:
            shippingOrBilling.email?.trim() ||
            formData.billing?.email ||
            'customer@example.com',
          phone_number: shippingOrBilling.phone_number?.startsWith('+')
            ? shippingOrBilling.phone_number
            : `+${shippingOrBilling.phone_number || '971501234567'}`,
          street: shippingOrBilling.street?.trim() || '',
          city: shippingOrBilling.city?.trim() || 'Dubai',
          country: 'AE',
        };

        const payload = {
          amount: amountToSend,
          order_id: id.id || id,
          billing: normalized,
          shipping: normalized,
          billingSameAsShipping: true,
          items: [
            {
              name: `Order ${id.id || id}`,
              amount: amountToSend,
              quantity: 1,
              description: 'Order from store1920.com',
            },
          ],
          provider: formData.paymentMethod,
        };

        try {
          const res = await fetch('https://db.store1920.com/wp-json/custom/v3/stripe-direct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          console.log('✅ Paymob Response =>', data);

          if (!res.ok) throw new Error(data.message || 'Failed to initiate payment.');
          if (!data.checkout_url && !data.payment_url)
            throw new Error('Paymob checkout URL missing.');
          window.location.href = data.checkout_url || data.payment_url;
          return;
        } catch (err) {
          console.error('❌ PAYMOB FETCH ERROR:', err);
          showAlert(err.message || 'Failed to initiate Paymob payment.', 'error');
        }
      }
    } catch (err) {
      console.error('❌ ORDER ERROR:', err);
      showAlert(err.message || 'Failed to place order.', 'error');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // -----------------------------
  // UI helpers
  // -----------------------------
  const getButtonStyle = () => {
    let backgroundColor = '#ff9800'; // Default orange
    let borderColor = '#f57c00';
    let hoverBorderColor = '#ef6c00';
    
    // Use exact brand colors for specific payment methods
    if (formData.paymentMethod === 'tabby') {
      backgroundColor = '#50C878'; // Tabby's exact teal/mint color
      borderColor = '#45B369';
      hoverBorderColor = '#3A9E5A';
    } else if (formData.paymentMethod === 'tamara') {
      backgroundColor = '#39B54A'; // Tamara's exact green color
      borderColor = '#2E9338';
      hoverBorderColor = '#237A2C';
    }
    
    const base = {
      color: '#ffffff',
      backgroundColor: backgroundColor,
      border: `1px solid ${borderColor}`,
      borderRadius: '25px',
      fontWeight: 600,
      padding: '14px 36px',
      cursor: isPlacingOrder ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
    };
    
    // Add hover effect styling
    const hoverStyle = {
      ':hover': {
        borderColor: hoverBorderColor,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }
    };

    return base;
  };

  const getButtonLabel = () => {
    const labels = {
      cod: 'Cash on Delivery',
      stripe: 'Stripe',
      paymob: 'Paymob',
      card: 'Card',
      tabby: 'Tabby',
      tamara: 'Tamara',
    };

    const defaultLogos = {
      tabby: Tabby,
      tamara: Tamara,
    };

    const method = formData.paymentMethod;
    const hasMethod = Boolean(method);
    const label = hasMethod ? (labels[method] || method) : 'Order';
  const rawLogo = hasMethod ? (defaultLogos[method] || formData.paymentMethodLogo || null) : null;
  const shouldHideLogo = method === 'cod' || method === 'card';
  const logoUrl = shouldHideLogo ? null : rawLogo;
    const baseText = isPlacingOrder
      ? hasMethod
        ? `Placing Order with ${label}...`
        : 'Placing Order...'
      : hasMethod
        ? `Place Order with ${label}`
        : 'Place Order';

    const wrapperStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      flexWrap: 'wrap',
      minHeight: '24px',
      textAlign: 'center',
    };

    if (!logoUrl) {
      return <span style={wrapperStyle}>{baseText}</span>;
    }

    const logoStyle = {
      height: method === 'tabby' || method === 'tamara' ? '38px' : '32px',
      width: method === 'tabby' || method === 'tamara' ? '60px' : 'auto',
      objectFit: 'contain',
      padding: '2px 4px',
      borderRadius: '4px',
      backgroundColor: '#f9fafb',
      border: '1px solid #d1d5db',
    };

    if (method === 'tabby' || method === 'tamara') {
      logoStyle.backgroundColor = 'transparent';
      logoStyle.border = 'none';
    } else if (method === 'cod') {
      logoStyle.backgroundColor = '#fff7ed';
      logoStyle.border = '1px solid #f97316';
    } else if (method === 'card') {
      logoStyle.backgroundColor = '#f0fdf4';
      logoStyle.border = '1px solid #22c55e';
    }

    return (
      <span style={wrapperStyle}>
        <span>{baseText}</span>
        <img
          src={logoUrl}
          alt={label}
          style={{
            ...logoStyle,
            visibility: isPlacingOrder ? 'hidden' : 'visible',
          }}
        />
      </span>
    );
  };

  return (
    <aside className="checkoutRightContainer">
      <Alert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: '', type: 'info' })}
      />
      <h2>Order Summary</h2>

      <CouponDiscount onApplyCoupon={() => {}} />

      <div className="summaryRowCR">
        <span>Total:</span>
        <span>AED {totalWithDelivery.toFixed(2)}</span>
      </div>

      <button
        className="placeOrderBtnCR"
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder || !canPlaceOrder}
        style={getButtonStyle()}
      >
        {getButtonLabel()}
      </button>

      <TrustSection />
    </aside>
  );
}
