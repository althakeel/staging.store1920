import React, { useState } from 'react';

const DataProtection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How does Store1920 protect my personal data?',
      answer: 'We use industry-standard encryption and security measures to safeguard your information.',
    },
    {
      question: 'Is my payment information stored?',
      answer: 'No, payment details are processed securely via third-party gateways and not stored on our servers.',
    },
    {
      question: 'Can I request deletion of my personal data?',
      answer: 'Yes, you can contact support to request data deletion in compliance with privacy laws.',
    },
    {
      question: 'How do you handle data breaches?',
      answer: 'In case of a breach, we notify affected users promptly and take steps to mitigate the impact.',
    },
    {
      question: 'Do you share my data with third parties?',
      answer: 'We do not share your personal data with third parties except for order fulfillment and legal requirements.',
    },
    {
      question: 'What cookies and trackers do you use?',
      answer: 'We use cookies to enhance site performance and user experience, details are in our privacy policy.',
    },
    {
      question: 'How can I update my privacy preferences?',
      answer: 'You can manage your preferences in your account settings or by contacting customer support.',
    },
    {
      question: 'Is my data transferred internationally?',
      answer: 'Data may be transferred to servers outside your country but always protected with strict security controls.',
    },
    {
      question: 'How long do you keep my data?',
      answer: 'We retain data only as long as necessary to provide services and comply with legal obligations.',
    },
    {
      question: 'Who can I contact about privacy concerns?',
      answer: 'Reach out to our Data Protection Officer via the contact information provided on our privacy policy page.',
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
    transition: 'backgroundColor 0.2s ease',
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

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
        Data Protection FAQs
      </h3>
      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            ...faqItemStyle,
            backgroundColor: activeIndex === index ? '#f9f9f9' : 'transparent',
            borderBottom: index === faqs.length - 1 ? '1px solid #ddd' : '',
          }}
          onClick={() => setActiveIndex(index === activeIndex ? null : index)}
        >
          <div style={faqQuestionStyle}>{faq.question}</div>
          {activeIndex === index && <div style={faqAnswerStyle}>{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default DataProtection;
