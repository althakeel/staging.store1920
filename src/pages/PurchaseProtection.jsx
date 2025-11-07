import React from 'react';
import '../assets/styles/PurchaseProtection.css';

const PurchaseProtection = () => {
  return (
    <div className="purchase-protection-wrapper">
      {/* Top Banner */}
      <section className="pp-banner-section">
        <div className="pp-container pp-banner-content">
          <img src="https://db.store1920.com/wp-content/uploads/2025/07/notification.png" alt="Protection" className="pp-banner-icon" />
          <div>
            <h2>100% Purchase Protection</h2>
            <p>At Store1920, your satisfaction is our priority. Enjoy a secure shopping experience with guaranteed support, timely delivery, and easy returns.</p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="pp-info-section">
        <div className="pp-container pp-info-content">
          <div className="pp-text-content">
            <h3>What is Purchase Protection?</h3>
            <p>Our Purchase Protection ensures you get what you ordered, delivered on time. If anything goes wrong, our support team is here to resolve it quickly.</p>
            <h4>You’re protected in cases of:</h4>
            <ul>
              <li>Wrong or damaged product received</li>
              <li>Product not delivered</li>
              <li>Return or refund issues</li>
            </ul>
          </div>
          <div className="pp-image-content">
            <img src="https://aimg.kwcdn.com/upload_aimg/pc/4d2bc087-fc46-4d2f-ad80-078961419209.png.slim.png?imageView2/2/w/800/q/70/format/webp" alt="Secure Shopping" />
          </div>
        </div>
      </section>

      {/* Refund Process */}
      <section className="pp-refund-section">
        <div className="pp-container">
          <h3>How the Refund Process Works</h3>
          <div className="pp-steps-wrapper">
            <div className="pp-step-card">
              <div className="pp-step-number">1</div>
              <h4>Raise a Request</h4>
              <p>Contact our support team within 48 hours of delivery.</p>
            </div>
            <div className="pp-step-card">
              <div className="pp-step-number">2</div>
              <h4>Review</h4>
              <p>Our team verifies the issue and initiates the process.</p>
            </div>
            <div className="pp-step-card">
              <div className="pp-step-number">3</div>
              <h4>Refund/Replacement</h4>
              <p>You’ll receive a refund or replacement in 3–5 business days.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PurchaseProtection;
