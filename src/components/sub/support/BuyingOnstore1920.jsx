import React, { useState } from 'react';

const BuyingOnstore1920 = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I place an order on Store1920?',
      answer: 'Browse products, add them to your cart, then proceed to checkout to complete your order.',
    },
    {
      question: 'Can I cancel my order after placing it?',
      answer: 'Orders can be canceled within 1 hour of placement. Contact support immediately to request cancellation.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept major credit cards, debit cards, and some digital wallets.',
    },
    {
      question: 'How do I apply a promo code?',
      answer: 'You can enter your promo code during the checkout process before completing payment.',
    },
    {
      question: 'Is there a guest checkout option?',
      answer: 'Yes, you can checkout as a guest without creating an account.',
    },
    {
      question: 'Can I save items in a wishlist?',
      answer: 'Yes, logged-in users can add products to their wishlist for future purchase.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Tracking details will be emailed once your order ships. You can also track orders in your account dashboard.',
    },
    {
      question: 'Are there any shipping fees?',
      answer: 'Shipping fees vary depending on location and order size; free shipping may be available on qualifying orders.',
    },
    {
      question: 'What should I do if I receive the wrong item?',
      answer: 'Contact customer service immediately to arrange a return or exchange.',
    },
    {
      question: 'How do I contact support if I have issues with my order?',
      answer: 'You can reach us via the contact form, phone, or live chat during business hours.',
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

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
        Buying on Store1920 FAQs
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

export default BuyingOnstore1920;
