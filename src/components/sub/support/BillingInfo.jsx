import React, { useState } from 'react';

const BillingInfo = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Where can I view my billing history?',
      answer: 'You can view your billing history in the "My Account" section under "Billing Information".',
    },
    {
      question: 'How often am I billed?',
      answer: 'Billing frequency depends on your selected plan—monthly or annually.',
    },
    {
      question: 'Can I download my invoices?',
      answer: 'Yes, invoices are available for download as PDF files from your billing dashboard.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept credit cards, debit cards, and some digital wallets depending on your region.',
    },
    {
      question: 'How do I update my billing address?',
      answer: 'Go to "Billing Information" and click "Edit" next to your current address.',
    },
    {
      question: 'Will I be notified before billing?',
      answer: 'Yes, we send an email notification before your billing date.',
    },
    {
      question: 'What should I do if I was charged incorrectly?',
      answer: 'Contact our support team with your order ID and a description of the issue.',
    },
    {
      question: 'Is my billing information secure?',
      answer: 'Yes, we use industry-standard encryption to protect your billing data.',
    },
    {
      question: 'Can I change my billing cycle?',
      answer: 'Yes, you can switch between monthly and annual billing in your subscription settings.',
    },
    {
      question: 'Where do I enter a promo code?',
      answer: 'Promo codes can be applied during checkout or in the "Billing Settings" area.',
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
        Billing Information FAQs
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

export default BillingInfo;
