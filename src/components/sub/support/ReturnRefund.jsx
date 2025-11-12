import React, { useState } from 'react';

const ReturnRefund = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const faqs = [
    {
      question: 'What is the return policy?',
      answer: 'You can return items within 30 days of delivery for a full refund or exchange.',
    },
    {
      question: 'How do I initiate a return?',
      answer: 'Go to "My Orders," select the item, and click "Start a Return" to get a return label.',
    },
    {
      question: 'Are there any items that cannot be returned?',
      answer: 'Yes, some items like personalized goods, perishables, and final sale items cannot be returned.',
    },
    {
      question: 'How long does it take to process a refund?',
      answer: 'Refunds are typically processed within 5–10 business days after we receive the returned item.',
    },
    {
      question: 'Will I get a refund for return shipping?',
      answer: 'Return shipping costs are refunded only if the return is due to our error or defective products.',
    },
    {
      question: 'What if the item I received is damaged or incorrect?',
      answer: 'Please contact support immediately and provide photos; we will arrange a replacement or refund.',
    },
    {
      question: 'Can I exchange an item instead of a refund?',
      answer: 'Yes, you can select exchange during the return process for the same or different item if available.',
    },
    {
      question: 'How do I track my return shipment?',
      answer: 'Use the tracking number provided with your return label to track the shipment with the courier.',
    },
    {
      question: 'What happens if I miss the return window?',
      answer: 'Unfortunately, returns outside the window cannot be processed, but contact support for assistance.',
    },
    {
      question: 'Can I return items purchased during a sale or promotion?',
      answer: 'Yes, sale items can be returned as long as they meet the return conditions outlined in our policy.',
    },
  ];

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

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
        Return & Refund FAQs
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

export default ReturnRefund;
