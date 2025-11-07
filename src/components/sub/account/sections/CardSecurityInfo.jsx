import React from 'react';
import '../../../../assets/styles/myaccount/PaymentMethodsSection.css';

const CardSecurityInfo = () => {
  return (
    <div className="card-security-info">
      <h3><span className="check-icon">✔</span> Store1920 protects your card information</h3>
      <ul>
        <li><span className="check-icon">✔</span> Store1920 follows the Payment Card Industry Data Security Standard (PCI DSS)</li>
        <li><span className="check-icon">✔</span> Card information is secure and uncompromised</li>
        <li><span className="check-icon">✔</span> All data is encrypted</li>
        <li><span className="check-icon">✔</span> Store1920 never sells your card information</li>
      </ul>

      <div className="security-logos">
            <img src="https://db.store1920.com/wp-content/uploads/2025/07/219cc18d-0462-47ae-bf84-128d38206065.png.slim_.webp" alt="SSL" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/96e8ab9b-d0dc-40ac-ad88-5513379c5ab3.png.slim_.webp" alt="ID Check" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/80d57653-6e89-4bd5-82c4-ac1e8e2489fd.png.slim_.webp" alt="SafeKey" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/65e96f45-9ff5-435a-afbf-0785934809ef.png.slim-1.webp" alt="PCI" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/058c1e09-2f89-4769-9fd9-a3cac76e13e5-1.webp" alt="APWG" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/28a227c9-37e6-4a82-b23b-0ad7814feed1.png.slim_.webp" alt="PCI" />
              <img src="https://db.store1920.com/wp-content/uploads/2025/07/1f29a857-fe21-444e-8617-f57f5aa064f4.png.slim_.webp" alt="APWG" />
      </div>
    </div>
  );
};

export default CardSecurityInfo;
