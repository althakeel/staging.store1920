import React, { useState } from 'react';

const BulkOrder = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is the minimum quantity for a bulk order?',
      answer: 'Our minimum bulk order quantity varies by product, typically starting at 50 units.',
    },
    {
      question: 'Are there discounts for bulk orders?',
      answer: 'Yes, we offer tiered discounts based on order volume. Contact sales for a custom quote.',
    },
    {
      question: 'How do I place a bulk order?',
      answer: 'Use the bulk order form on our website or contact our sales team directly for assistance.',
    },
    {
      question: 'Can I customize products for bulk orders?',
      answer: 'Customization options depend on the product. Please contact us with your requirements.',
    },
    {
      question: 'What is the lead time for bulk orders?',
      answer: 'Lead times vary depending on the product and quantity; usually between 2-6 weeks.',
    },
    {
      question: 'Do you offer international shipping for bulk orders?',
      answer: 'Yes, we ship bulk orders worldwide. Shipping costs and timelines vary by destination.',
    },
    {
      question: 'What payment methods are accepted for bulk orders?',
      answer: 'We accept credit cards, bank transfers, and other payment methods as arranged with sales.',
    },
    {
      question: 'Can I return bulk order items?',
      answer: 'Bulk orders are subject to our standard return policy unless otherwise agreed.',
    },
    {
      question: 'Is there dedicated support for bulk order customers?',
      answer: 'Yes, bulk order clients have a dedicated account manager to assist with their needs.',
    },
    {
      question: 'How do I track my bulk order shipment?',
      answer: 'Once shipped, tracking details will be provided via email or your account dashboard.',
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

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
        Bulk Order FAQs
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

export default BulkOrder;
