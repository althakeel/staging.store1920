import React from 'react';
import '../../assets/styles/checkout/TrustSection.css';
import { useNavigate } from 'react-router-dom';
import Image1 from '../../assets/images/Footer icons/1.webp'
import Image2 from '../../assets/images/Footer icons/4.webp'
import Image3 from '../../assets/images/Footer icons/7.webp'
import Image4 from '../../assets/images/Footer icons/8.webp'
import Image5 from '../../assets/images/Footer icons/9.webp'
import Image6 from '../../assets/images/Footer icons/10.webp'
import Image7 from '../../assets/images/Footer icons/21.webp'

const TrustSection = () => {
  const navigate = useNavigate();

  return (
    <div className="trust-section">
      {/* Tree Planting Program */}
      

      {/* Delivery Guarantee */}
      <div className="trust-box">
        <h3>🚚 Delivery Guarantee</h3>
        <ul>
          <li>✔ AED 20.00 Store Credit if your delivery is delayed by more than 7 days.</li>
          <li>✔ 100% Refund if your item arrives damaged or not as described.</li>
          <li>✔ No updates on tracking for 15+ days? Get a full refund — no questions asked.</li>
          <li>✔ No delivery in 30 days? You’ll get your money back in full.</li>
        </ul>
        <p>
          Your time matters. That’s why we’ve built a delivery policy that puts your peace of mind first.
        </p>
        <button onClick={() => navigate('/delivery-guarantee')}>Learn more ›</button>
      </div>

      {/* Payment Security */}
      <div className="trust-box">
        <h3>🔒 We protect your card</h3>
        <ul>
          <li>✔ Compliant with PCI DSS Level 1 — the highest payment security standard.</li>
          <li>✔ Industry-grade 256-bit SSL encryption on all payment pages.</li>
          <li>✔ Your card details are never stored or shared. Period.</li>
        </ul>
        <div className="card-logos">
           <img src={Image1} alt="SSL" />
              <img src={Image2} alt="ID Check" />
              <img src={Image3} alt="SafeKey" />
              <img src={Image4} alt="PCI" />
              <img src={Image5} alt="APWG" />
              <img src={Image6} alt="PCI" />
              <img src={Image7} alt="APWG" />
        </div>
        <button onClick={() => navigate('/security-info')}>Learn more ›</button>
      </div>

      {/* Privacy Commitment */}
      <div className="trust-box">
        <h3>🛡 Secure Privacy</h3>
        <p>
          We understand the importance of keeping your personal data safe. Your information is processed in compliance with 
          international privacy laws (GDPR & CCPA).
        </p>
        <ul>
          <li>✔ No third-party reselling of personal data.</li>
          <li>✔ Encrypted user profiles and cookie preferences.</li>
          <li>✔ Fully transparent privacy and cookie policies.</li>
        </ul>
        <button onClick={() => navigate('/privacy-policy')}>Learn more ›</button>
      </div>

      {/* Purchase Protection */}
      <div className="trust-box">
        <h3>✅ Purchase Protection</h3>
        <p>
          Enjoy full confidence with every order. If something doesn’t go right, we’re here to help with fast refunds and fair resolutions.
        </p>
        <ul>
          <li>✔ 24/7 customer support via live chat & email.</li>
          <li>✔ Escalation handling within 48 hours.</li>
          <li>✔ Full or partial refunds in case of fraud or disputes.</li>
        </ul>
        <button onClick={() => navigate('/purchaseprotection')}>Learn more ›</button>
      </div>
    </div>
  );
};

export default TrustSection;
