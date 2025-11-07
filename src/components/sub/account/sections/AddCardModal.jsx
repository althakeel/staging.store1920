import React from 'react';
import '../../../../assets/styles/myaccount/AddCardModal.css';
import AddCardSection from './AddCardSection';

const AddCardModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // When user clicks on overlay, close modal
  const handleOverlayClick = () => {
    onClose();
  };

  // Prevent clicks inside modal content from closing the modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="close-button" onClick={onClose}>✕</button>
        <AddCardSection />
      </div>
    </div>
  );
};

export default AddCardModal;
