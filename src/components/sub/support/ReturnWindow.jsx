import React, { useState } from 'react';

const ReturnWindow = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is the return window for Store1920?',
      answer: 'The return window is typically 30 days from the date you receive your order to request a return or exchange.',
    },
    {
      question: 'Can I return an item after the return window?',
      answer: 'Unfortunately, items returned after the return window may not be accepted for refund or exchange.',
    },
    {
      question: 'Does the return window apply to all products?',
      answer: 'Most products follow the 30-day return policy, but some limited edition or customized items may have different terms.',
    },
    {
      question: 'When does the return window start?',
      answer: 'The return window starts on the day you receive the item, as indicated by the shipping carrier’s delivery confirmation.',
    },
    {
      question: 'What if I received the wrong item?',
      answer: 'If you receive the wrong item, contact support immediately. You may be eligible for an extended return window.',
    },
    {
      question: 'Can I return an opened product?',
      answer: 'Opened products may be returned if they are defective or damaged, but please check specific item conditions in the return policy.',
    },
    {
      question: 'Are return windows different for international orders?',
      answer: 'International orders may have different return windows based on shipping times and local regulations.',
    },
    {
      question: 'How do I check when my return window expires?',
      answer: 'You can check your order details in your account or the return instructions emailed to you.',
    },
    {
      question: 'What happens if I miss the return window?',
      answer: 'If the return window is missed, refunds or exchanges may not be possible, but you can contact support for exceptions.',
    },
    {
      question: 'Is the return window extended during holidays or promotions?',
      answer: 'Sometimes return windows are extended during special promotions or holidays. Please check announcements for details.',
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
        Return Window FAQs
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

export default ReturnWindow;
