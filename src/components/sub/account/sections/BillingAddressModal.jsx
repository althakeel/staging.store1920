import React from 'react';
import '../../../../assets/styles/myaccount/BillingAddressModal.css';

const BillingAddressModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="billing-modal-overlay">
      <div className="billing-modal-content">
        <button className="billing-close-button" onClick={onClose}>✕</button>
        <h3>Billing Address</h3>
        <form className="billing-form">
          <input type="text" placeholder="Full Name" required />
          <input type="text" placeholder="Street Address" required />
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State/Province" required />
          <input type="text" placeholder="Postal Code" required />
          <input type="text" placeholder="Country" required />
          <button type="submit" className="billing-save-button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default BillingAddressModal;
