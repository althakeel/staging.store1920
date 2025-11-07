import React, { useState, useEffect } from 'react';
import '../../assets/styles/checkoutleft/shippinginfo.css'

const ShippingInfo = ({ address, onAddAddress, onChangeAddress, shippingMethod, onChangeShipping }) => {
  return (
    <div className="shipping-info-row">
      <div className="address-box">
        <h4>📍 Shipping Address</h4>
        {address ? (
          <div className="address-details">
            <p>{address}</p>
            <button onClick={onChangeAddress}>Change</button>
          </div>
        ) : (
          <button className="add-address-btn" onClick={onAddAddress}>+ Add Address</button>
        )}
      </div>

      <div className="shipping-method-box">
        <h4>🚚 Shipping Method</h4>
        {shippingMethod ? (
          <div className="shipping-details">
            <p>{shippingMethod}</p>
            <button onClick={onChangeShipping}>Change</button>
          </div>
        ) : (
          <p className="no-shipping">Select Method at Checkout</p>
        )}
      </div>
    </div>
  );
};

export default ShippingInfo;
