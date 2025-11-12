import React, { useState } from 'react';

const RequestItem = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I request a new item to be added to the store?',
      answer: 'You can request new items by filling out the "Request Item" form available in your account dashboard.',
    },
    {
      question: 'Is there a limit to the number of items I can request?',
      answer: 'There is no strict limit, but we encourage you to prioritize your most desired items.',
    },
    {
      question: 'How long does it take for requested items to appear in the store?',
      answer: 'After review, item additions usually take 2-4 weeks depending on supplier availability.',
    },
    {
      question: 'Can I suggest specific brands or models?',
      answer: 'Yes, please provide detailed information about the brand, model, and specifications.',
    },
    {
      question: 'Will I be notified when my requested item is available?',
      answer: 'Yes, we notify you via email once the item is stocked or available for pre-order.',
    },
    {
      question: 'Do I need to pay when requesting an item?',
      answer: 'No payment is required when submitting a request. Payment is only required when placing an order.',
    },
    {
      question: 'Can I request items that are currently out of stock?',
      answer: 'Yes, you can request restocking of out-of-stock items through the request form.',
    },
    {
      question: 'Are bulk or wholesale requests accepted?',
      answer: 'Yes, you can request bulk orders by selecting the appropriate option in the request form.',
    },
    {
      question: 'How can I check the status of my item request?',
      answer: 'Track the status under "My Requests" in your account or contact support for updates.',
    },
    {
      question: 'What happens if my requested item cannot be supplied?',
      answer: 'If an item is unavailable, we will inform you promptly and may suggest alternatives.',
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
        Request Item FAQs
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

export default RequestItem;
