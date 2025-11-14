import React from "react";

const TamaraSuccess = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7fafc', padding: 16 }}>
    <div style={{
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      padding: '40px 24px',
      maxWidth: 400,
      width: '100%',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 48, color: '#39B54A', marginBottom: 16 }}>✔</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 12px 0', color: '#222' }}>Payment Successful</h1>
      <p style={{ color: '#444', fontSize: 16, marginBottom: 24 }}>
        Your Tamara payment was successful.<br />Thank you for your purchase!
      </p>
      <a href="/" style={{
        display: 'inline-block',
        padding: '10px 28px',
        background: '#39B54A',
        color: '#fff',
        borderRadius: 8,
        fontWeight: 600,
        fontSize: 16,
        textDecoration: 'none',
        transition: 'background 0.2s',
      }}>Return to Home</a>
    </div>
  </div>
);

export default TamaraSuccess;
