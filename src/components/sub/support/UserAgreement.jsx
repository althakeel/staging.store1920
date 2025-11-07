import React, { useState } from 'react';

const UserAgreement = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is the User Agreement?',
      answer: 'The User Agreement outlines the terms and conditions for using Store1920’s services and website.',
    },
    {
      question: 'Do I need to agree to the User Agreement to use the site?',
      answer: 'Yes, by using our website and services, you agree to comply with the User Agreement terms.',
    },
    {
      question: 'Can the User Agreement change over time?',
      answer: 'Yes, we may update the User Agreement occasionally; we recommend reviewing it periodically.',
    },
    {
      question: 'Where can I find the full User Agreement?',
      answer: 'The full User Agreement is available at the bottom of every page under "User Agreement" link.',
    },
    {
      question: 'What happens if I violate the User Agreement?',
      answer: 'Violation may result in suspension or termination of your account and access to our services.',
    },
    {
      question: 'Are there any restrictions on using Store1920?',
      answer: 'Yes, certain behaviors such as fraud, unauthorized access, or misuse are prohibited under the agreement.',
    },
    {
      question: 'How is my privacy protected under the User Agreement?',
      answer: 'Our Privacy Policy, referenced in the User Agreement, explains how we collect and protect your data.',
    },
    {
      question: 'Can I dispute charges or orders under the User Agreement?',
      answer: 'Yes, there is a dispute resolution process detailed in the User Agreement you can follow.',
    },
    {
      question: 'Who can I contact if I have questions about the User Agreement?',
      answer: 'You can contact our customer support for any questions regarding the User Agreement.',
    },
    {
      question: 'Does the User Agreement cover international users?',
      answer: 'Yes, it applies globally, but some provisions may vary depending on your country of residence.',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>User Agreement FAQs</h3>
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

export default UserAgreement;
