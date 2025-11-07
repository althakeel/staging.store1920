import React, { useState } from 'react';

const FindMyOrder = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by visiting the "My Orders" section in your account and clicking on the tracking link.',
    },
    {
      question: 'What if I did not receive a tracking number?',
      answer: 'If you did not receive a tracking number, please check your spam folder or contact our support team.',
    },
    {
      question: 'Can I track my order without an account?',
      answer: 'Yes, you can track your order using the order confirmation email which contains a tracking link.',
    },
    {
      question: 'Why is my order status still "Processing"?',
      answer: 'It usually means your order is being prepared for shipment. It may take 1-2 business days before it ships.',
    },
    {
      question: 'What should I do if my order is lost?',
      answer: 'Contact our customer support with your order ID so we can investigate and assist you further.',
    },
    {
      question: 'How long does it take to update the tracking information?',
      answer: 'Tracking info updates usually take 24-48 hours after your order ships.',
    },
    {
      question: 'Can I change my shipping address after ordering?',
      answer: 'Please contact support as soon as possible; address changes are only possible before shipment.',
    },
    {
      question: 'Why is my package marked as delivered but I have not received it?',
      answer: 'Please check with neighbors or your local post office. If still missing, contact support for help.',
    },
    {
      question: 'How do I know if my order was successfully placed?',
      answer: 'You will receive an order confirmation email immediately after purchase with all details.',
    },
    {
      question: 'What if I need to cancel my order?',
      answer: 'You can cancel your order from the "My Orders" page if it has not yet shipped, or contact support for assistance.',
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
        Find My Order FAQs
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

export default FindMyOrder;
