import React, { useState } from 'react';

const PaymentMethods = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What payment methods does Store1920 accept?',
      answer: 'We accept major credit/debit cards, PayPal, Apple Pay, Google Pay, and select local payment options.',
    },
    {
      question: 'Can I use multiple payment methods for one order?',
      answer: 'Currently, only one payment method can be used per order.',
    },
    {
      question: 'Is it safe to save my payment information?',
      answer: 'Yes, we use secure encryption and tokenization to protect your payment details.',
    },
    {
      question: 'Why was my payment method declined?',
      answer: 'Common reasons include insufficient funds, expired card, incorrect billing details, or bank restrictions.',
    },
    {
      question: 'Can I pay with a prepaid or gift card?',
      answer: 'Prepaid and gift cards are accepted if they are enabled for online transactions and have sufficient balance.',
    },
    {
      question: 'Are there any fees for using certain payment methods?',
      answer: 'No, we do not charge additional fees regardless of the payment method.',
    },
    {
      question: 'How do I update my saved payment methods?',
      answer: 'Go to your account settings under “Payment Methods” to add, edit, or remove cards.',
    },
    {
      question: 'Can I request an invoice or receipt?',
      answer: 'Yes, an electronic receipt is sent after every successful transaction. Invoices can be requested from support.',
    },
    {
      question: 'Do you accept international credit cards?',
      answer: 'Yes, we accept most international credit and debit cards, subject to your bank’s authorization.',
    },
    {
      question: 'What should I do if my payment is not processing?',
      answer: 'Try refreshing the page, use a different browser or device, or contact your bank. If the problem persists, contact our support.',
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
        Payment Methods FAQs
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

export default PaymentMethods;
