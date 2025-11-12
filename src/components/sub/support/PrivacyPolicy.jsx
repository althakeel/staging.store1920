import React, { useState } from 'react';

const PrivacyPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What personal data does Store1920 collect?',
      answer: 'We collect information like your name, email, shipping address, payment details, and browsing behavior to provide our services.',
    },
    {
      question: 'How is my personal data used?',
      answer: 'Your data is used to process orders, improve our services, send updates, and personalize your experience.',
    },
    {
      question: 'Do you share my data with third parties?',
      answer: 'We only share your data with trusted partners necessary for order fulfillment and service delivery, under strict confidentiality.',
    },
    {
      question: 'How do you protect my personal information?',
      answer: 'We use encryption, secure servers, and regular audits to protect your data from unauthorized access.',
    },
    {
      question: 'Can I request access to my personal data?',
      answer: 'Yes, you can request to view, update, or delete your personal information by contacting our support team.',
    },
    {
      question: 'Do you use cookies and tracking?',
      answer: 'Yes, cookies help us remember your preferences and analyze site traffic. You can manage cookies in your browser.',
    },
    {
      question: 'How long do you retain my personal data?',
      answer: 'We retain your data only as long as necessary to fulfill orders and comply with legal obligations.',
    },
    {
      question: 'Is my payment information stored?',
      answer: 'Payment details are processed securely and not stored on our servers directly; we use trusted payment gateways.',
    },
    {
      question: 'How can I unsubscribe from marketing emails?',
      answer: 'You can unsubscribe anytime using the link at the bottom of marketing emails or through your account settings.',
    },
    {
      question: 'What should I do if I suspect a data breach?',
      answer: 'Contact our support immediately so we can investigate and take appropriate action.',
    },
  ];

  const containerStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '12px',
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
    fontSize: '13px',
  };

  const faqAnswerStyle = {
    marginTop: '8px',
    fontSize: '12px',
    color: '#555',
    display: 'block',
  };

 

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
        Privacy Policy FAQs
      </h3>
      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            ...faqItemStyle,
            backgroundColor: activeIndex === index ? '#f9f9f9' : 'transparent',
            borderBottom: index === faqs.length - 1 ? '1px solid #ddd' : '',
          }}
          onClick={() => toggleFAQ(index)}
        >
          <div style={faqQuestionStyle}>{faq.question}</div>
          {activeIndex === index && <div style={faqAnswerStyle}>{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
