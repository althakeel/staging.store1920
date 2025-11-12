import React, { useState } from 'react';

const WholesalePricing = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is the minimum order quantity for wholesale pricing?',
      answer: 'The minimum order quantity varies by product; please check the product details or contact support.',
    },
    {
      question: 'How do I qualify for wholesale pricing?',
      answer: 'Wholesale pricing is available for registered business accounts and bulk orders.',
    },
    {
      question: 'Can I get a custom quote for large orders?',
      answer: 'Yes, please contact our sales team with your requirements for a custom quote.',
    },
    {
      question: 'Are there discounts for repeat wholesale customers?',
      answer: 'We offer loyalty discounts for repeat and high-volume wholesale customers.',
    },
    {
      question: 'How do I place a wholesale order?',
      answer: 'Wholesale orders can be placed through your account dashboard or by contacting our wholesale team.',
    },
    {
      question: 'What payment methods are accepted for wholesale orders?',
      answer: 'We accept bank transfers, credit cards, and other payment methods as agreed upon.',
    },
    {
      question: 'Can I return wholesale items?',
      answer: 'Return policies for wholesale orders are detailed in our terms; typically, returns require prior approval.',
    },
    {
      question: 'Is shipping included in the wholesale price?',
      answer: 'Shipping costs may be separate; please verify with the sales team or during checkout.',
    },
    {
      question: 'How long does it take to process wholesale orders?',
      answer: 'Processing times vary based on order size and product availability, typically 3-7 business days.',
    },
    {
      question: 'Who do I contact for support on wholesale pricing?',
      answer: 'Please contact our wholesale support team via email or phone for assistance.',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Wholesale Pricing FAQs</h3>
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

export default WholesalePricing;
