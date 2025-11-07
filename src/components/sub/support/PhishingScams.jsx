import React, { useState } from 'react';

const PaymentPromos = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I apply a promo code?',
      answer: 'Enter the promo code at checkout in the "Promo Code" field and click "Apply".',
    },
    {
      question: 'Can I use multiple promo codes on one order?',
      answer: 'No, only one promo code can be applied per order.',
    },
    {
      question: 'Why is my promo code not working?',
      answer: 'Promo codes may be expired, not applicable to your items, or have minimum purchase requirements.',
    },
    {
      question: 'Are promo codes valid on sale items?',
      answer: 'Usually, promo codes cannot be combined with sale or clearance prices unless stated.',
    },
    {
      question: 'Can I get promo codes for first-time buyers?',
      answer: 'Yes, we often offer exclusive promo codes for new customers via newsletter signup.',
    },
    {
      question: 'Do promo codes work on international orders?',
      answer: 'Some promo codes are limited to specific countries. Check the promo details for eligibility.',
    },
    {
      question: 'How long are promo codes valid?',
      answer: 'Promo codes have expiration dates; please use them before they expire.',
    },
    {
      question: 'Can I use a promo code on gift cards?',
      answer: 'Promo codes typically do not apply to gift card purchases.',
    },
    {
      question: 'Will I be refunded if I return an item bought with a promo code?',
      answer: 'Refunds will reflect the amount actually paid after promo discounts.',
    },
    {
      question: 'Where can I find the latest promo codes?',
      answer: 'Check our homepage banners, newsletters, and social media channels for the latest promos.',
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
        Payment & Promo Codes FAQs
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

export default PaymentPromos;
