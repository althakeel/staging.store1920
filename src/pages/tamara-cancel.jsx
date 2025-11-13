import React from "react";

const TamaraCancel = () => {
  // For demo, use today's date and static payment method
  const today = new Date();
  const orderDate = today.toLocaleDateString('en-GB');
  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        background: '#fff',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(44,62,80,0.10)',
        padding: '56px 48px 40px 48px',
        maxWidth: 900,
        width: '100%',
        textAlign: 'center',
        margin: 24,
      }}>
        <div style={{ fontSize: 56, color: '#ff9800', marginBottom: 18, fontWeight: 400, lineHeight: 1 }}>✕</div>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#ff9800', marginBottom: 10, letterSpacing: 0.1 }}>Order Cancelled</div>
        <div style={{ color: '#888', fontSize: 18, marginBottom: 32, fontWeight: 400, lineHeight: 1.5 }}>
          You aborted the payment. Please retry or choose another payment method.
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, fontSize: 16, color: '#888', borderBottom: '1px solid #eee', paddingBottom: 18 }}>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <span style={{ color: '#aaa' }}>Order date:</span>
            <span style={{ fontWeight: 700, color: '#222', marginLeft: 8 }}>{orderDate}</span>
          </div>
          <div style={{ textAlign: 'right', flex: 1 }}>
            <span style={{ color: '#aaa' }}>Payment method:</span>
            <span style={{ fontWeight: 700, color: '#ff9800', marginLeft: 8 }}>Tamara</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <a href="/" style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'linear-gradient(90deg, #ffb347 0%, #ff9800 100%)',
            color: '#fff',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 17,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(44,62,80,0.10)',
            transition: 'background 0.2s',
          }}>Continue Shopping</a>
          <a href="/support" style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'linear-gradient(90deg, #ffb347 0%, #ff9800 100%)',
            color: '#fff',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 17,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(44,62,80,0.10)',
            transition: 'background 0.2s',
          }}>Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default TamaraCancel;
