import React, { useState } from 'react';

const OutOfStock = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Why is the item out of stock?',
      answer: 'Items go out of stock due to high demand or limited supply. We restock as soon as possible.',
    },
    {
      question: 'How can I be notified when the item is back in stock?',
      answer: 'Use the “Notify Me” feature on the product page to receive an email alert once it is available.',
    },
    {
      question: 'Can I preorder out of stock items?',
      answer: 'Preorders are available only for selected items; check the product page for preorder options.',
    },
    {
      question: 'How long does it take to restock an item?',
      answer: 'Restock times vary, usually between 1 to 4 weeks depending on the supplier.',
    },
    {
      question: 'Can I buy from another store if it’s out of stock here?',
      answer: 'We recommend checking other authorized retailers or our marketplace partners.',
    },
    {
      question: 'Will out of stock items be discontinued?',
      answer: 'Not necessarily; some items are temporarily unavailable while others may be discontinued.',
    },
    {
      question: 'What if I ordered an item and it is suddenly out of stock?',
      answer: 'We will notify you immediately and offer alternatives, refunds, or wait for restock options.',
    },
    {
      question: 'Can I cancel my order if the item is out of stock?',
      answer: 'Yes, you can cancel or modify your order before shipment if the item is out of stock.',
    },
    {
      question: 'Are there any discounts on restocked items?',
      answer: 'Occasionally, restocked items are offered with promotions; check our sales and newsletters.',
    },
    {
      question: 'How can I contact support about an out of stock item?',
      answer: 'Use the contact form on our support page or call our customer service for assistance.',
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
        Out Of Stock FAQs
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

export default OutOfStock;
