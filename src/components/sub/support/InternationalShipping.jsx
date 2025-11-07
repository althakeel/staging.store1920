import React, { useState } from 'react';

const InternationalShipping = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we offer international shipping to many countries worldwide.',
    },
    {
      question: 'How long does international shipping take?',
      answer: 'Delivery times vary by destination but typically take 7-21 business days.',
    },
    {
      question: 'Are there additional customs fees?',
      answer: 'Customs fees and import taxes may apply depending on your country’s regulations.',
    },
    {
      question: 'How can I track my international order?',
      answer: 'You will receive a tracking number once your order ships, allowing you to track it online.',
    },
    {
      question: 'What shipping carriers do you use for international orders?',
      answer: 'We use trusted carriers like DHL, FedEx, and USPS for international deliveries.',
    },
    {
      question: 'Can I change my international shipping address after ordering?',
      answer: 'Please contact customer support as soon as possible to update your shipping address.',
    },
    {
      question: 'Are there any countries you do not ship to?',
      answer: 'Currently, we do not ship to certain restricted countries due to legal or logistical reasons.',
    },
    {
      question: 'What happens if my international shipment is delayed?',
      answer: 'Delays can happen due to customs or carrier issues; contact support if delays exceed expected times.',
    },
    {
      question: 'Do you offer international shipping insurance?',
      answer: 'Yes, shipping insurance is included for international orders to protect your package.',
    },
    {
      question: 'Can I return international orders?',
      answer: 'Yes, returns are accepted but you are responsible for return shipping costs unless the item is defective.',
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
        International Shipping FAQs
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

export default InternationalShipping;
