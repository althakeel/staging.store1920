import React, { useState } from 'react';

const TermsOfService = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What are the main terms of service for Store1920?',
      answer: 'Our terms outline user responsibilities, purchase conditions, and Store1920’s obligations.',
    },
    {
      question: 'How do I accept the Terms of Service?',
      answer: 'By using Store1920 services, you agree to comply with our Terms of Service.',
    },
    {
      question: 'Can the Terms of Service change?',
      answer: 'Yes, we may update the Terms. Continued use means you accept the changes.',
    },
    {
      question: 'What if I disagree with the Terms?',
      answer: 'If you disagree, you should not use our services or purchase products.',
    },
    {
      question: 'Are there rules about account security?',
      answer: 'Users are responsible for keeping their account credentials confidential.',
    },
    {
      question: 'What are the payment terms?',
      answer: 'Payments must be made in full at the time of purchase unless otherwise specified.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Order cancellation terms are defined in our cancellation policy linked in the Terms.',
    },
    {
      question: 'How is liability limited under the Terms?',
      answer: 'Store1920 limits liability for damages arising from use of the website and services as described.',
    },
    {
      question: 'Are disputes governed by specific laws?',
      answer: 'Yes, disputes are governed by the laws of the jurisdiction specified in the Terms.',
    },
    {
      question: 'Where can I find the full Terms of Service?',
      answer: 'The complete Terms are available on the Store1920 website footer under "Terms of Service."',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Terms of Service FAQs</h3>
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

export default TermsOfService;
