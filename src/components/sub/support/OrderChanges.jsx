import React, { useState } from 'react';

const OrderChanges = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Can I change my order after placing it?',
      answer: 'You can modify your order within 1 hour of placement by contacting our support team.',
    },
    {
      question: 'How do I add or remove items from my order?',
      answer: 'Contact customer support as soon as possible to request adding or removing items.',
    },
    {
      question: 'Can I change the shipping address after ordering?',
      answer: 'Shipping address changes are allowed only if the order has not yet been dispatched.',
    },
    {
      question: 'What if I want to cancel my order?',
      answer: 'You can cancel your order within the first hour. After that, it may be too late to cancel.',
    },
    {
      question: 'How can I track changes made to my order?',
      answer: 'Order updates and changes are reflected in your account order history.',
    },
    {
      question: 'Is there a fee for changing an order?',
      answer: 'Generally, order changes are free if requested promptly; late changes might incur fees.',
    },
    {
      question: 'Can I change the payment method after placing an order?',
      answer: 'Payment method changes are possible only before the order is processed.',
    },
    {
      question: 'What happens if I miss the window to change my order?',
      answer: 'If the order is already processed or shipped, you may need to return it once received.',
    },
    {
      question: 'How will I be notified about order changes?',
      answer: 'Notifications are sent via email and shown in your account dashboard.',
    },
    {
      question: 'Who do I contact for urgent order changes?',
      answer: 'Please contact Store1920 customer support immediately for urgent assistance.',
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
        Order Changes FAQs
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

export default OrderChanges;
