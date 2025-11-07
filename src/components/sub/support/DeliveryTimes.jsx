import React, { useState } from 'react';

const DeliveryTimes = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What are the standard delivery times?',
      answer: 'Standard delivery usually takes between 1 to 7 business days depending on your location.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive a tracking number via email to monitor your package.',
    },
    {
      question: 'Do you offer expedited shipping?',
      answer: 'Yes, expedited shipping options are available at checkout for faster delivery.',
    },
    {
      question: 'Are there delivery delays during holidays?',
      answer: 'Yes, delivery times may be extended during peak seasons or public holidays.',
    },
    {
      question: 'What time are orders shipped?',
      answer: 'Orders placed before 2 PM on business days are typically shipped the same day.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, international shipping is available but may take longer than domestic delivery.',
    },
    {
      question: 'Can I change my delivery address after placing an order?',
      answer: 'Please contact customer support as soon as possible to update your delivery address.',
    },
    {
      question: 'What happens if I am not home during delivery?',
      answer: 'Couriers usually leave a notice with instructions on how to reschedule or collect your package.',
    },
    {
      question: 'Are weekend deliveries available?',
      answer: 'Weekend deliveries depend on the courier and your location; please check your options at checkout.',
    },
    {
      question: 'What should I do if my order is delayed?',
      answer: 'If your delivery exceeds the expected timeframe, contact our support team for assistance.',
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
        Delivery Times FAQs
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

export default DeliveryTimes;
