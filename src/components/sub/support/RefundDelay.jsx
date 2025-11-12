import React, { useState } from 'react';

const RefundDelay = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Why is my refund taking longer than expected?',
      answer: 'Refunds can be delayed due to bank processing times or additional verification steps.',
    },
    {
      question: 'How long do refunds usually take?',
      answer: 'Refunds typically process within 5-10 business days but may vary based on your payment method.',
    },
    {
      question: 'Can I speed up the refund process?',
      answer: 'Unfortunately, refund timing depends on your bank and payment processor; you can contact them for updates.',
    },
    {
      question: 'Will I be notified when my refund is processed?',
      answer: 'Yes, you will receive an email confirmation once the refund is initiated.',
    },
    {
      question: 'Why does it say refunded but I don’t see money in my account?',
      answer: 'Sometimes refunds show immediately on your statement but may take several days to appear in your balance.',
    },
    {
      question: 'Can refunds be issued to a different payment method?',
      answer: 'Refunds are issued only to the original payment method for security reasons.',
    },
    {
      question: 'What if I used a gift card for my purchase?',
      answer: 'Refunds to gift cards may have different policies; contact support for assistance.',
    },
    {
      question: 'Does it take longer to get a refund during holidays?',
      answer: 'Yes, bank processing times may be longer during public holidays and weekends.',
    },
    {
      question: 'How can I check the status of my refund?',
      answer: 'You can check your refund status in your account under "Orders" or contact customer support.',
    },
    {
      question: 'What should I do if my refund is overdue?',
      answer: 'If your refund is delayed beyond the expected period, please contact our support team with your order details.',
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
        Refund Delay FAQs
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

export default RefundDelay;
