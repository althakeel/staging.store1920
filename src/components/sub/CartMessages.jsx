import React from 'react';
import { FaCheck } from 'react-icons/fa';

const CartMessages = () => {
  const boxStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#edf7ed',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '10px',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#1a1a1a',
  };

  const iconStyle = {
    color: 'green',
    marginRight: '10px',
    flexShrink: 0,
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={boxStyle}>
        <FaCheck style={iconStyle} />
        <span><strong>Free shipping</strong> on all items in your cart</span>
      </div>
      <div style={boxStyle}>
        <FaCheck style={iconStyle} />
        <span><strong>COD fees 50% OFF.</strong> Limited-time offer!</span>
      </div>
    </div>
  );
};

export default CartMessages;
