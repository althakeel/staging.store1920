import React, { useState } from 'react';

const RequestFeature = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I request a new feature?',
      answer: 'You can submit your feature requests through the "Request Feature" form in your account or contact support.',
    },
    {
      question: 'Can I track the status of my feature request?',
      answer: 'Currently, we notify users by email when a requested feature is planned or released.',
    },
    {
      question: 'Are feature requests free to submit?',
      answer: 'Yes, submitting feature requests is free and open to all users.',
    },
    {
      question: 'How long does it take for requested features to be implemented?',
      answer: 'Implementation time varies depending on complexity and priority, but we strive to deliver timely updates.',
    },
    {
      question: 'Can I vote for features requested by other users?',
      answer: 'Yes, our platform allows users to vote on popular feature requests to help prioritize development.',
    },
    {
      question: 'Will I be notified if my feature is rejected?',
      answer: 'We notify users if a feature request cannot be fulfilled, explaining the reasons when possible.',
    },
    {
      question: 'How do I know if a feature has been added?',
      answer: 'New features are announced via email newsletters and our update blog.',
    },
    {
      question: 'Can I suggest improvements to existing features?',
      answer: 'Absolutely! We welcome suggestions to improve existing functionalities.',
    },
    {
      question: 'What if my requested feature requires a fee?',
      answer: 'If a feature involves additional costs, we will inform you before implementation.',
    },
    {
      question: 'Can I request features for specific products?',
      answer: 'Yes, you can request features related to specific products or the overall platform experience.',
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
        Request Feature FAQs
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

export default RequestFeature;
