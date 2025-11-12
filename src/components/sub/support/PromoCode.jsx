import React, { useState } from 'react';

const PromoCode = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I apply a promo code?',
      answer: 'You can enter your promo code at checkout in the designated promo code box and click "Apply".',
    },
    {
      question: 'Where can I find promo codes?',
      answer: 'Promo codes are often sent via email newsletters, social media, or displayed on our homepage during special sales.',
    },
    {
      question: 'Can I use multiple promo codes on one order?',
      answer: 'No, only one promo code can be applied per order.',
    },
    {
      question: 'Why is my promo code not working?',
      answer: 'Make sure the promo code is valid, not expired, and applicable to your items or order amount.',
    },
    {
      question: 'Do promo codes apply to sale items?',
      answer: 'Some promo codes exclude sale or clearance items. Check the terms and conditions of the promo.',
    },
    {
      question: 'Can I use promo codes on all products?',
      answer: 'Certain products or categories may be excluded from promo code discounts.',
    },
    {
      question: 'Are promo codes valid in all countries?',
      answer: 'Promo code validity may vary by region. Check the promo details for location restrictions.',
    },
    {
      question: 'Can I get a refund if I forget to use a promo code?',
      answer: 'Promo codes cannot be applied retroactively after purchase.',
    },
    {
      question: 'How long are promo codes valid?',
      answer: 'Promo codes usually have an expiration date specified in the offer details.',
    },
    {
      question: 'Can I share my promo code with friends?',
      answer: 'Promo codes are generally for individual use, but some may be shared as part of referral programs.',
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
        Promo Code FAQs
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

export default PromoCode;
