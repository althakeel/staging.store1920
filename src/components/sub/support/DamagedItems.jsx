import React, { useState } from 'react';

const DamagedItems = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What should I do if my item arrived damaged?',
      answer: 'Please contact our support immediately with photos of the damaged item and packaging.',
    },
    {
      question: 'Can I return a damaged item?',
      answer: 'Yes, damaged items are eligible for return or replacement within the return window.',
    },
    {
      question: 'How long do I have to report a damaged item?',
      answer: 'Report damaged items within 7 days of delivery for the best resolution.',
    },
    {
      question: 'Will I get a full refund for damaged items?',
      answer: 'Refunds or replacements will be issued depending on the case and product condition.',
    },
    {
      question: 'Do I need to return the damaged item?',
      answer: 'In most cases, yes. We will provide return instructions after your claim is processed.',
    },
    {
      question: 'What if the damage occurred during shipping?',
      answer: 'We work with couriers to handle shipping damage claims; please provide all details.',
    },
    {
      question: 'Can I exchange a damaged item?',
      answer: 'Yes, exchanges for damaged items are possible. Contact support for the process.',
    },
    {
      question: 'Will I have to pay for shipping when returning damaged items?',
      answer: 'Return shipping for damaged items is usually covered by us, depending on the situation.',
    },
    {
      question: 'How long does it take to process a damaged item claim?',
      answer: 'Claims are typically processed within 5-7 business days after submission.',
    },
    {
      question: 'Who should I contact for damaged item support?',
      answer: 'Reach out to our customer support via email, phone, or live chat for assistance.',
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
    transition: 'backgroundColor 0.2s ease',
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
        Damaged Items FAQs
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

export default DamagedItems;
