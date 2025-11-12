import React from 'react';
import '../assets/styles/SafetyCenter.css'; 
import Image8 from '../assets/images/Footer icons/2.webp';
import Image9 from '../assets/images/Footer icons/3.webp';
import Image10 from '../assets/images/Footer icons/6.webp';
import Image11 from '../assets/images/Footer icons/11.webp';
import Image12 from '../assets/images/Footer icons/12.webp';
import Image13 from '../assets/images/Footer icons/13.webp';
import Image14 from '../assets/images/Footer icons/16.webp';
import Image15 from '../assets/images/Footer icons/17.webp';
import Image16 from '../assets/images/Footer icons/18.webp';
import Image17 from '../assets/images/Footer icons/19.webp';
import Image18 from '../assets/images/Footer icons/20.webp';
import SafetyIcon from '../assets/images/safetycenter/support-center-1.webp'



const SafetyCenter = () => {
  return (
    <div className="safety-center-container">
      <div className="safety-header">
        <div className="header-inner">
  <div className="header-text">
    <h1>Safety Center</h1>
    <p className="subtitle">
      Store1920 is committed to creating a secure and trustworthy shopping experience. Learn how we protect you.
    </p>
  </div>

  <div className="header-image">
    <img src={SafetyIcon} alt="Safety" />
  </div>
</div>

      </div>

      <div className="safety-content">
        <section className="safety-section">
          <h2>Protect your information</h2>
          <div className="safety-grid">
            <button>🔒 Protect your data</button>
            <button>🧑‍💼 Protect your account</button>
            <button>💳 Protect your payment</button>
          </div>
        </section>

        <section className="safety-section">
          <h2>Stay safe from scammers</h2>
          <div className="safety-grid">
            <button>🕵️ Recognize scams</button>
            <button>📧 Recognize scam emails</button>
            <button>💬 Recognize scam messages</button>
          </div>
        </section>

        <section className="safety-section">
          <h2>Report something suspicious</h2>
          <div className="safety-grid report-grid">
            <button>📞 Report suspicious calls, emails, or texts</button>
            <button>🌐 Report fake website or app</button>
            <button>🎁 Report promotions, fraud, or job scams</button>
          </div>
        </section>

        <section className="safety-section">
          <h2>Safety Partners</h2>
          <p>
            Store1920 supports secure payment methods and holds multiple security certifications.
          </p>
          <div className="partner-logos">
             <img src={Image8} alt="Visa" />
              <img src={Image9} alt="MasterCard" />
              <img src={Image10} alt="AmEx" />
              <img src={Image11} alt="PayPal" />
              <img src={Image12} alt="Cash" />
              <img src={Image13} alt="Apple Pay" />
              <img src={Image14} alt="Apple Pay" />   
              <img src={Image15} alt="Apple Pay" />   
              <img src={Image16} alt="Apple Pay" />   
              <img src={Image17} alt="Apple Pay" />   
              <img src={Image18} alt="Apple Pay" />   
      </div>
        </section>
      </div>
    </div>
  );
};

export default SafetyCenter;
