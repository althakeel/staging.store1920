import React, { useState } from 'react';

const SafeAccess = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is Safe Access on Store1920?',
      answer: 'Safe Access is our security feature ensuring that only authorized users can access your account.',
    },
    {
      question: 'How do I enable Safe Access?',
      answer: 'You can enable Safe Access from your account security settings by turning on two-factor authentication.',
    },
    {
      question: 'Can I use Safe Access on multiple devices?',
      answer: 'Yes, Safe Access supports multiple devices but requires verification on each new device.',
    },
    {
      question: 'What happens if I lose access to my device?',
      answer: 'You can use backup codes or contact support to regain access if you lose your device.',
    },
    {
      question: 'Is Safe Access mandatory?',
      answer: 'It is highly recommended to enable Safe Access for your account’s protection but not mandatory.',
    },
    {
      question: 'How does Safe Access protect my account?',
      answer: 'It adds an additional verification step beyond your password to prevent unauthorized access.',
    },
    {
      question: 'Can Safe Access block login attempts from unknown locations?',
      answer: 'Yes, Safe Access alerts you and can block suspicious login attempts from unfamiliar locations.',
    },
    {
      question: 'How do I disable Safe Access?',
      answer: 'You can disable it anytime in your account security settings, though it is not recommended.',
    },
    {
      question: 'Will Safe Access affect my login speed?',
      answer: 'Safe Access adds a quick verification step but does not significantly delay your login process.',
    },
    {
      question: 'Who can I contact for help with Safe Access?',
      answer: 'Our customer support team is available 24/7 to help you with any Safe Access issues.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Safe Access FAQs</h3>
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

export default SafeAccess;
