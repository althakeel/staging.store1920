import React, { useState } from 'react';

const Checkout = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I complete the checkout process?',
      answer: 'Add items to your cart, proceed to checkout, fill in shipping and payment details, then confirm your order.',
    },
    {
      question: 'Can I save my payment information for future purchases?',
      answer: 'Yes, you can securely save payment info during checkout for faster future purchases.',
    },
    {
      question: 'What payment methods are accepted at checkout?',
      answer: 'We accept credit cards, debit cards, and various digital wallets like Apple Pay and Google Pay.',
    },
    {
      question: 'Can I apply promo codes during checkout?',
      answer: 'Yes, enter your promo code in the designated field before confirming your order.',
    },
    {
      question: 'What if my payment fails during checkout?',
      answer: 'Check your payment details and try again. Contact your bank or our support if issues persist.',
    },
    {
      question: 'Is checkout secure?',
      answer: 'Absolutely, we use industry-standard encryption to protect your data throughout the process.',
    },
    {
      question: 'Can I change my shipping address during checkout?',
      answer: 'Yes, you can enter or update your shipping address on the checkout page before confirming.',
    },
    {
      question: 'How do I know if my order was successful?',
      answer: 'After payment, you will see a confirmation page and receive a confirmation email.',
    },
    {
      question: 'Can I request gift wrapping during checkout?',
      answer: 'Yes, select the gift wrapping option if available during the checkout process.',
    },
    {
      question: 'What should I do if I encounter errors during checkout?',
      answer: 'Try refreshing the page or using a different browser. Contact support if the problem continues.',
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
        Checkout FAQs
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

export default Checkout;
