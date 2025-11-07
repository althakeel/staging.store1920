import React, { useState } from 'react';

const ReturnShippingCost = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Who pays for return shipping?',
      answer: 'Return shipping costs are typically paid by the customer unless the return is due to our error or defective products.',
    },
    {
      question: 'Is return shipping refundable?',
      answer: 'Return shipping fees are refunded only when the return is because of a mistake on our part or damaged items.',
    },
    {
      question: 'Can I use any courier for my return?',
      answer: 'Please use the return shipping label and courier provided during the return process to ensure proper tracking.',
    },
    {
      question: 'What if I lose the return shipping label?',
      answer: 'Contact customer support immediately to get a replacement label or instructions for returning your item.',
    },
    {
      question: 'Do I get a prepaid return label?',
      answer: 'Prepaid return labels are provided only for eligible returns such as damaged or incorrect items.',
    },
    {
      question: 'How long do I have to send the return?',
      answer: 'Returns must be shipped within the return window, usually 30 days from delivery, to be eligible for a refund.',
    },
    {
      question: 'What happens if I return an item without a label?',
      answer: 'Returns without our authorized label may be rejected or incur additional fees deducted from your refund.',
    },
    {
      question: 'Can I track my return shipment?',
      answer: 'Yes, use the tracking number on the return label to track your package with the courier service.',
    },
    {
      question: 'Are international return shipping costs covered?',
      answer: 'International return shipping is usually the customer’s responsibility unless otherwise specified.',
    },
    {
      question: 'How do I appeal return shipping fees charged unfairly?',
      answer: 'Contact our support team with your order details and we will review your case promptly.',
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
        Return Shipping Cost FAQs
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

export default ReturnShippingCost;
