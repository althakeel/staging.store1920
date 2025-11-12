import React, { useState } from 'react';

const RestockAlerts = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What are restock alerts?',
      answer: 'Restock alerts notify you when an out-of-stock item is available again.',
    },
    {
      question: 'How do I sign up for restock alerts?',
      answer: 'On the product page, enter your email in the restock alert section and submit.',
    },
    {
      question: 'Will I get notified immediately when the item is restocked?',
      answer: 'Yes, once the item is back in stock, you will receive an email notification promptly.',
    },
    {
      question: 'Can I unsubscribe from restock alerts?',
      answer: 'Yes, each restock alert email contains an unsubscribe link at the bottom.',
    },
    {
      question: 'How many restock alerts can I subscribe to?',
      answer: 'You can subscribe to restock alerts for multiple products without limit.',
    },
    {
      question: 'Do I need an account to sign up for restock alerts?',
      answer: 'No, you can subscribe using just your email address.',
    },
    {
      question: 'What if I don’t receive the restock alert email?',
      answer: 'Check your spam or junk folder and whitelist our email address to ensure delivery.',
    },
    {
      question: 'Are restock alerts available internationally?',
      answer: 'Yes, restock alerts are sent to customers worldwide.',
    },
    {
      question: 'Can I set alerts for limited edition products?',
      answer: 'Yes, restock alerts are available for all product types, including limited editions.',
    },
    {
      question: 'How often will I get restock alerts for the same product?',
      answer: 'You will receive an alert only once per restock event for each product.',
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
        Restock Alerts FAQs
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

export default RestockAlerts;
