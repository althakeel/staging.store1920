import React, { useState } from 'react';
import '../../../../assets/styles/myaccount/AddCardSection.css';

const AddCardSection = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Allow only digits for card number
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setCardNumber(value);
  };

  // Allow only digits and slash for expiry MM/YY, max length 5
  const handleExpiryChange = (e) => {
    let value = e.target.value;
    // Remove anything not digit or slash
    value = value.replace(/[^\d/]/g, '');
    // Limit to max length 5
    if (value.length > 5) value = value.slice(0, 5);
    setExpiry(value);
  };

  // Allow only digits for CVV, max length 4
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    setCvv(value);
  };

  // Optional: format expiry input to add slash automatically
  // You can add this if you want me to

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, handle submission (e.g. send token to backend)
    alert(`Card Number: ${cardNumber}\nExpiry: ${expiry}\nCVV: ${cvv}`);
  };

  return (
    <div className="add-card-container">
      <h2 className="card-title">Add a new card</h2>
      <form className="card-form" onSubmit={handleSubmit}>
        <label className="form-label">Card Number</label>
        <input
          className="form-input"
          type="text"
          placeholder="Card number"
          required
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength={19}
          inputMode="numeric"
          autoComplete="cc-number"
        />

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Expiration Date</label>
            <input
              className="form-input"
              type="text"
              placeholder="MM/YY"
              required
              value={expiry}
              onChange={handleExpiryChange}
              maxLength={5}
              inputMode="numeric"
              autoComplete="cc-exp"
            />
          </div>
          <div className="form-group">
            <label className="form-label">CVV</label>
            <input
              className="form-input"
              type="text"
              placeholder="3-4 digits"
              required
              value={cvv}
              onChange={handleCvvChange}
              maxLength={4}
              inputMode="numeric"
              autoComplete="cc-csc"
            />
          </div>
        </div>

        <button type="submit" className="submit-card">Add your card</button>
      </form>

      <div className="accepted-cards">
        <img src="https://db.store1920.com/wp-content/uploads/2025/07/ec0c5d69-1717-4571-a193-9950ec73c8af.png.slim_.webp" alt="PayPal" />
        <img src="https://db.store1920.com/wp-content/uploads/2025/07/da7f463a-916f-4d91-bcbb-047317a1c35e.png.slim_.webp" alt="Cash" />
        <img src="https://db.store1920.com/wp-content/uploads/2025/07/c3e5eb19-1b60-4c2b-87e1-4528fb390cbf.png.slim_.webp" alt="Apple Pay" />
        <img src="https://db.store1920.com/wp-content/uploads/2025/07/bcb8bf23-78c9-45ab-b480-f7020d1a5f66.png.slim_.webp" alt="Apple Pay" />
        <img src="https://db.store1920.com/wp-content/uploads/2025/07/b79a2dc3-b089-4cf8-a907-015a25ca12f2.png.slim_.webp" alt="Apple Pay" />
        <img src="https://db.store1920.com/wp-content/uploads/2025/07/936bf9dc-9bb2-4935-9c5a-a70b800d4cf1.png.slim_.webp" alt="Apple Pay" />
      </div>

      <div className="card-security-info">
        <h4 className="security-heading">Store1920 protects your card information</h4>
        <ul className="security-list">
          <li>Store1920 follows the Payment Card Industry Data Security Standard (PCI DSS) when handling card data</li>
          <li>Card information is secure and uncompromised</li>
          <li>All data is encrypted</li>
          <li>Store1920 never sells your card information</li>
        </ul>
      </div>
    </div>
  );
};

export default AddCardSection;
