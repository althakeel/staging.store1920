import React, { useState } from 'react';

const ShippingDelivery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How long does delivery take?',
      answer: 'Delivery times usually range from 1 to 7 business days depending on your location.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to many countries worldwide. Shipping costs and times vary by destination.',
    },
    {
      question: 'How can I track my shipment?',
      answer: 'After your order ships, you will receive a tracking number via email to track your package.',
    },
    {
      question: 'What are your shipping options?',
      answer: 'We offer standard, expedited, and express shipping options at checkout.',
    },
    {
      question: 'What happens if I miss a delivery?',
      answer: 'If you miss a delivery, the courier usually attempts a redelivery or leaves instructions for pickup.',
    },
    {
      question: 'Can I change my shipping address after placing an order?',
      answer: 'Changes can be made within 1 hour of placing your order by contacting our support team.',
    },
    {
      question: 'Are there any shipping restrictions?',
      answer: 'Some products may have shipping restrictions depending on destination or regulations.',
    },
    {
      question: 'What should I do if my package is damaged during shipping?',
      answer: 'Please contact us immediately with photos of the damage so we can assist with a replacement.',
    },
    {
      question: 'Do you provide shipping insurance?',
      answer: 'Yes, shipping insurance is included for most orders at no extra cost.',
    },
    {
      question: 'How much does shipping cost?',
      answer: 'Shipping costs depend on the weight, size, and destination of your order and are calculated at checkout.',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Shipping & Delivery FAQs</h3>
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

export default ShippingDelivery;
