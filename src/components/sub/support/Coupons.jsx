import React, { useState } from 'react';

const Coupons = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I apply a coupon code?',
      answer: 'Enter your coupon code during checkout in the designated field and click "Apply."',
    },
    {
      question: 'Can I use multiple coupons on one order?',
      answer: 'Usually only one coupon code can be applied per order unless otherwise specified.',
    },
    {
      question: 'Where can I find available coupons?',
      answer: 'Check our promotions page, newsletters, or partner sites for the latest coupons.',
    },
    {
      question: 'Do coupons have expiration dates?',
      answer: 'Yes, all coupons have expiry dates stated in the offer details.',
    },
    {
      question: 'What should I do if my coupon code does not work?',
      answer: 'Verify the code is entered correctly, the coupon is valid, and your order meets requirements.',
    },
    {
      question: 'Are coupons valid on sale items?',
      answer: 'Some coupons exclude sale or clearance items; check terms and conditions for details.',
    },
    {
      question: 'Can I get a refund if I forget to use a coupon?',
      answer: 'Coupons cannot be applied retroactively after an order is placed.',
    },
    {
      question: 'Do coupons work with gift cards?',
      answer: 'Yes, coupons can usually be combined with gift cards unless otherwise stated.',
    },
    {
      question: 'Are there geographic restrictions on coupons?',
      answer: 'Some coupons may only be valid in certain regions or countries.',
    },
    {
      question: 'How often do you offer new coupons?',
      answer: 'We regularly update our promotions, so subscribe to our newsletter to stay informed.',
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
        Coupons FAQs
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

export default Coupons;
