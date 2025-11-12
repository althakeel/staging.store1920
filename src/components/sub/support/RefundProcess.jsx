import React, { useState } from 'react';

const RefundProcess = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I start the refund process?',
      answer: 'You can initiate a refund by visiting your order history, selecting the order, and clicking the "Request Refund" button.',
    },
    {
      question: 'How long does the refund process take?',
      answer: 'The refund process typically takes 5-10 business days after your request is approved.',
    },
    {
      question: 'Do I need to return the product to get a refund?',
      answer: 'Yes, most refunds require the product to be returned in its original condition.',
    },
    {
      question: 'How will I know if my refund request is approved?',
      answer: 'You will receive an email notification once your refund request has been approved.',
    },
    {
      question: 'Can I cancel my refund request?',
      answer: 'Refund requests can usually be canceled if the return shipment has not yet been received. Contact support for help.',
    },
    {
      question: 'Will I get a full refund?',
      answer: 'Refunds are generally full amount minus any applicable shipping or restocking fees.',
    },
    {
      question: 'What payment methods are refunds issued to?',
      answer: 'Refunds are issued back to the original payment method used during purchase.',
    },
    {
      question: 'What if I lost my refund confirmation email?',
      answer: 'You can check your refund status in your account dashboard or contact support for assistance.',
    },
    {
      question: 'Is there a time limit to request a refund?',
      answer: 'Refund requests must typically be made within 30 days of delivery.',
    },
    {
      question: 'What happens if the returned product is damaged?',
      answer: 'If the product is damaged, the refund may be reduced or denied depending on the condition.',
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
        Refund Process FAQs
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

export default RefundProcess;
