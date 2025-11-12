import React, { useState } from 'react';
import '../../../../assets/styles/myaccount/PaymentMethodsSection.css';
import CardSecurityInfo from './CardSecurityInfo';
import AddCardModal from './AddCardModal';
import Card from '../../../../assets/images/Purse (1).png';

const PaymentMethodsSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="payment-wrapper">
      <h2 className="payment-heading">
        Your payment methods <span className="lock-icon">🔒</span>
        <span className="encrypted-text">All data is encrypted</span>
      </h2>

      <div className="payment-card-box">
        <div className="payment-graphic">
          <img src={Card} alt="Card Icon" className="card-icon" />
        </div>
        <div className="payment-description">
          <p className="payment-text">Save cards for a faster checkout</p>
          <div className="badges">
            <span className="badge green">✔ Secure payment</span>
            <span className="badge green">✔ Convenient payment</span>
          </div>
        </div>

        <button className="add-card-button" onClick={() => setModalOpen(true)}>
          + Add a credit or debit card
        </button>

        <div className="card-icons">
             <img src="https://db.store1920.com/wp-content/uploads/2025/07/058c1e09-2f89-4769-9fd9-a3cac76e13e5-1.webp" alt="Visa" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/6fad9cde-cc9c-4364-8583-74bb32612cea.webp" alt="MasterCard" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/3a626fff-bbf7-4a26-899a-92c42eef809a.png.slim_.webp" alt="AmEx" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/ec0c5d69-1717-4571-a193-9950ec73c8af.png.slim_.webp" alt="PayPal" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/da7f463a-916f-4d91-bcbb-047317a1c35e.png.slim_.webp" alt="Cash" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/c3e5eb19-1b60-4c2b-87e1-4528fb390cbf.png.slim_.webp" alt="Apple Pay" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/bcb8bf23-78c9-45ab-b480-f7020d1a5f66.png.slim_.webp" alt="Apple Pay" />   
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/b79a2dc3-b089-4cf8-a907-015a25ca12f2.png.slim_.webp" alt="Apple Pay" />   
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/ae5e15c1-ffe8-42c4-9ddb-bb9ed1fdcf6a.png.slim_.webp" alt="Apple Pay" />   
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/936bf9dc-9bb2-4935-9c5a-a70b800d4cf1.png.slim_.webp" alt="Apple Pay" />   
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/ac293ffc-9957-4588-a4df-f3397b4a54e0.png.slim_.webp" alt="Apple Pay" />   
        </div>
       </div>

      <AddCardModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <CardSecurityInfo />
    </div>
  );
};

export default PaymentMethodsSection;