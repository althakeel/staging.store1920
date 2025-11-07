import React, { useState } from 'react';

const FailedPayment = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Why did my payment fail?',
      answer: 'It could be due to insufficient funds, incorrect billing info, or a bank decline for security reasons.',
    },
    {
      question: 'How can I retry a failed payment?',
      answer: 'Visit your order details page, click "Retry Payment", and complete the payment using the same or a different method.',
    },
    {
      question: 'I was charged, but my order wasn’t placed. What now?',
      answer: 'The amount may be held temporarily by your bank and refunded automatically within 3–7 business days.',
    },
    {
      question: 'Can I use a different card or method if the payment fails?',
      answer: 'Yes. Simply choose another payment method at checkout after the failed attempt.',
    },
    {
      question: 'What does “payment declined by bank” mean?',
      answer: 'Your bank may block the transaction due to fraud checks or card restrictions. Contact them to resolve it.',
    },
    {
      question: 'Is my card information safe even if payment fails?',
      answer: 'Absolutely. Your card details are encrypted and never stored or exposed.',
    },
    {
      question: 'Will I be charged multiple times if I retry?',
      answer: 'No. You will only be charged once for a successful transaction.',
    },
    {
      question: 'Can I get customer support for a failed payment?',
      answer: 'Yes. Please contact our support team with your order ID and error message if possible.',
    },
    {
      question: 'Do VPNs affect payment processing?',
      answer: 'Yes. Some banks or gateways block payments made via VPNs due to fraud prevention.',
    },
    {
      question: 'How long does a refund take after a failed payment?',
      answer: 'Refunds are typically processed within 3–7 business days depending on your bank.',
    },
  ];

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#333',
  };

  const titleStyle = {
    fontSize: '20px',
    marginBottom: '24px',
    color: '#222',
  };

  const faqItemStyle = {
    borderTop: '1px solid #ddd',
    padding: '16px 0',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const faqItemHoverStyle = {
    backgroundColor: '#f9f9f9',
  };

  const faqQuestionStyle = {
    fontWeight: 600,
    fontSize: '15px',
  };

  const faqAnswerStyle = {
    marginTop: '8px',
    fontSize: '14px',
    color: '#555',
    display: 'block',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Failed Payment FAQs</h2>
      <div style={{ marginTop: '24px' }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              ...faqItemStyle,
              ...(activeIndex === index ? faqItemHoverStyle : {}),
              borderBottom: index === faqs.length - 1 ? '1px solid #ddd' : '',
            }}
            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
          >
            <div style={faqQuestionStyle}>{faq.question}</div>
            {activeIndex === index && <div style={faqAnswerStyle}>{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FailedPayment;
