import React, { useState } from 'react';

const OrderIssues = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Why hasn’t my order shipped yet?',
      answer: 'Orders typically ship within 1-2 business days. Delays may occur due to high demand or inventory issues.',
    },
    {
      question: 'How do I track my order?',
      answer: 'You can track your order using the tracking number sent to your email or via your Store1920 account.',
    },
    {
      question: 'What if I received the wrong item?',
      answer: 'Contact customer support immediately to report incorrect shipments for return or exchange options.',
    },
    {
      question: 'My order is missing items, what should I do?',
      answer: 'Check your package carefully; some items ship separately. If missing after a few days, contact support.',
    },
    {
      question: 'Can I change my shipping address after ordering?',
      answer: 'Shipping address changes are possible only before the order is dispatched. Contact support ASAP.',
    },
    {
      question: 'Why was my order canceled?',
      answer: 'Orders may be canceled due to payment issues, stock unavailability, or suspected fraud.',
    },
    {
      question: 'How can I cancel my order?',
      answer: 'You can cancel your order within one hour of placing it by contacting our support team.',
    },
    {
      question: 'I paid but did not receive an order confirmation email.',
      answer: 'Check your spam/junk folder. If you still don’t see it, contact support with your payment details.',
    },
    {
      question: 'Why is my payment pending?',
      answer: 'Payments can take time to process. If pending for over 24 hours, contact your bank or Store1920 support.',
    },
    {
      question: 'What do I do if my order is delayed?',
      answer: 'Check your tracking info. If delays persist, contact support for assistance.',
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
        Order Issues FAQs
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

export default OrderIssues;
