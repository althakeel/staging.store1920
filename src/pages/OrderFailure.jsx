import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getOrderById } from "../api/woocommerce";
import "../assets/styles/OrderSuccess.css";

const formatPrice = (value) => {
  const amount = Number.parseFloat(value);
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return `AED ${safeAmount.toFixed(2)}`;
};

export default function OrderFailure() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await getOrderById(orderId);
      setOrder(data);
      setLoading(false);
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="order-success-container">
        <div className="order-success-card">
          <div className="loading-spinner">Loading order details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="order-header">
          <div className="fail-icon" style={{ fontSize: '4rem', color: '#dc3545', marginBottom: '1rem' }}>✗</div>
          <h1 className="thank-you-title" style={{ color: '#dc3545' }}>Order Failed</h1>
          <p className="thank-you-subtitle">Sorry, Tabby is unable to approve this purchase. Please use an alternative payment method for your order.</p>
        </div>
        {order && (
          <div className="order-info-grid">
            <div className="info-item">
              <span className="info-label">Order date:</span>
              <span className="info-value">{new Date(order.date_created).toLocaleDateString('en-GB')}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Payment method:</span>
              <span className="info-value">{order.payment_method_title || 'N/A'}</span>
            </div>
          </div>
        )}
        {/* <div style={{ padding: '20px', backgroundColor: '#fee', borderRadius: '8px', marginTop: '20px', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#c0392b' }}>
            The payment failed. Please try again or contact support if the problem persists.
          </p>
        </div> */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
          <button className="track-order-btn" onClick={() => navigate('/')}>Continue Shopping</button>
          <button className="track-order-btn" onClick={() => navigate('/contact')} style={{ backgroundColor: '#95a5a6' }}>Contact Support</button>
        </div>
      </div>
    </div>
  );
}
