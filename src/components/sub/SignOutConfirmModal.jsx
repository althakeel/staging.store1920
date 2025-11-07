// src/components/sub/SignOutConfirmModal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import '../../assets/styles/SignOutConfirmModal.css';

const SignOutConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h3 className="modal-title">Confirm Sign Out</h3>
        <p className="modal-message">Are you sure you want to sign out?</p>
        <div className="modal-buttons">
          <button className="btn btn-confirm" onClick={onConfirm} type="button">
            Yes, Sign Out
          </button>
          <button className="btn btn-cancel" onClick={onCancel} type="button">
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SignOutConfirmModal;
