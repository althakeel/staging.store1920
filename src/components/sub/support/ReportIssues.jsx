import React, { useState } from 'react';

const ReportIssues = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I report an issue on Store1920?',
      answer: 'You can report issues via the "Report Issue" button found in your account or contact our support directly.',
    },
    {
      question: 'What types of issues can I report?',
      answer: 'You can report product problems, payment issues, delivery delays, and suspicious activity.',
    },
    {
      question: 'How long does it take to resolve reported issues?',
      answer: 'Most issues are addressed within 48-72 hours, depending on complexity.',
    },
    {
      question: 'Can I track the status of my reported issue?',
      answer: 'Yes, you can track your issue status in your account dashboard under "Support Tickets."',
    },
    {
      question: 'What information should I provide when reporting an issue?',
      answer: 'Provide your order number, detailed description, and any relevant photos or documents.',
    },
    {
      question: 'Will my personal information be kept confidential?',
      answer: 'Absolutely. We take your privacy seriously and handle your data securely.',
    },
    {
      question: 'What if my issue is not resolved satisfactorily?',
      answer: 'You can escalate your concern by contacting our customer service manager via email.',
    },
    {
      question: 'Are there any fees for reporting issues?',
      answer: 'No, reporting an issue and getting support is completely free.',
    },
    {
      question: 'Can I report issues anonymously?',
      answer: 'We recommend providing contact info for follow-up, but anonymous reports are accepted for certain issues.',
    },
    {
      question: 'How do I report a suspicious or fraudulent activity?',
      answer: 'Report suspicious activity immediately via the "Report Fraud" section or contact our security team directly.',
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
        Report Issues FAQs
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

export default ReportIssues;
