import React, { useState } from 'react';

const UpdateInfo = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const faqs = [
    {
      question: 'How do I update my personal information?',
      answer: 'Go to your account settings and edit your personal details like name, address, and phone number.',
    },
    {
      question: 'Can I change my email address?',
      answer: 'Yes, you can update your email in your profile settings, but you may need to verify the new email.',
    },
    {
      question: 'How do I update my phone number?',
      answer: 'Navigate to Account Settings > Contact Info and update your phone number. A verification code may be sent to confirm.',
    },
    {
      question: 'Will updating my info affect my orders?',
      answer: 'No, updating your profile info does not affect your existing orders or order history.',
    },
    {
      question: 'Can I update my shipping address?',
      answer: 'Yes, update your shipping address in your account, but changes may not apply to orders already placed.',
    },
    {
      question: 'Is it safe to update my information online?',
      answer: 'Yes, Store1920 uses secure encryption to protect your data during updates.',
    },
    {
      question: 'How often can I update my information?',
      answer: 'You can update your personal info anytime, but frequent changes may require additional verification.',
    },
    {
      question: 'What if I enter incorrect information?',
      answer: 'Contact customer support immediately to correct any inaccurate details in your account.',
    },
    {
      question: 'Can I update payment information here?',
      answer: 'Payment details are managed separately under Payment Methods for security reasons.',
    },
    {
      question: 'How do I delete or deactivate my account?',
      answer: 'Visit Account Settings > Delete Account to start the process. Note that this action is permanent.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '14px',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    color: '#333',
  };

  const faqItemStyle = {
    borderTop: '1px solid #ddd',
    padding: '16px 0',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const faqQuestionStyle = {
    fontWeight: '500',
    fontSize: '14px',
  };

  const faqAnswerStyle = {
    marginTop: '8px',
    fontSize: '13px',
    color: '#555',
    display: 'block',
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Update Info FAQs</h3>
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          style={{
            ...faqItemStyle,
            backgroundColor: activeIndex === idx ? '#f9f9f9' : 'transparent',
            borderBottom: idx === faqs.length - 1 ? '1px solid #ddd' : '',
          }}
          onClick={() => toggleFAQ(idx)}
        >
          <div style={faqQuestionStyle}>{faq.question}</div>
          {activeIndex === idx && <div style={faqAnswerStyle}>{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default UpdateInfo;
