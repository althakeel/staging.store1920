import React, { useState } from 'react';
import '../../../assets/styles/WhyChoose.css';
import ReminderIcon from '../../../assets/images/insurance.png'
import LockIcon from '../../../assets/images/icons/Asset 324@6x.png'
import SecureIcon from '../../../assets/images/icons/Asset 338@6x.png'
import Cardicon from '../../../assets/images/icons/Asset 344@6x.png'
import Deliveryicon from '../../../assets/images/icons/Asset 325@6x.png'
import NotficationIcon from '../../../assets/images/icons/Asset 320@6x.png'



const WhyChoose = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="whychoose-wrapper">
        <div className="whychoose-container">
          {/* Green Bar */}
          <div className="whychoose-bar" onClick={openModal}>
            <div className="whychoose-left">
              <img src={LockIcon} alt="Check" className="whychoose-icon" />
              <span className="whychoose-title">Why choose Store1920</span>
            </div>
            <div className="whychoose-right">
              <a href="#">
                <img src={SecureIcon} alt="Secure" className="whychoose-link-icon" />
                <span>Secure privacy</span>
              </a>
              <span className="divider">|</span>
              <a href="#">
                <img src={Cardicon} alt="Payment" className="whychoose-link-icon" />
                <span>Safe payments</span>
              </a>
              <span className="divider">|</span>
              <a href="#">
                <img src={Deliveryicon} alt="Delivery" className="whychoose-link-icon" />
                <span>Delivery guarantee&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </a>
            </div>
          </div>

          {/* Reminder Bar */}
          <div className="whychoose-reminder">
            <img src={NotficationIcon} alt="Alert" className="reminder-icon" />

            <p className="reminder-text">
              <strong>Security reminder:</strong> Please be wary of scam messages and links. Store1920 won't ask for extra fees via SMS or email.
            </p>
            <button className="reminder-view" onClick={openModal}>View ›</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="whychoose-modal-overlay">
          <div className="whychoose-modal">
            <button className="modal-close" onClick={closeModal}>×</button>
            <img
              src={ReminderIcon}
              alt="Security Icon"
              className="modal-image"
            />
            <h3>Security reminder</h3>
            <p>
              Store1920 values your privacy and security. We will never send requests for extra payments by SMS or email.
              If you receive any requests claiming to be from Store1920, we strongly suggest you ignore them and do not
              click on any links they may contain. Here are some <a href="#">common fraud cases</a> for reference.
            </p>
            <p className="report-text">
              If you come across anything suspicious, please report it in time.
            </p>
            <button className="modal-ok" onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default WhyChoose;
