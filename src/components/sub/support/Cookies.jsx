import React, { useState } from 'react';

const Cookies = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What are cookies?',
      answer: 'Cookies are small text files stored on your device that help us improve your experience.',
    },
    {
      question: 'Why does Store1920 use cookies?',
      answer: 'We use cookies to remember your preferences, improve site functionality, and analyze traffic.',
    },
    {
      question: 'Are cookies safe?',
      answer: 'Yes, cookies do not contain personal information and are safe to use.',
    },
    {
      question: 'Can I disable cookies?',
      answer: 'You can disable cookies through your browser settings, but some site features may not work properly.',
    },
    {
      question: 'Do third parties use cookies on Store1920?',
      answer: 'Yes, we allow third-party services for analytics and advertising, which may place cookies.',
    },
    {
      question: 'How long do cookies last?',
      answer: 'Cookie duration varies; some expire at session end, others last for months or years.',
    },
    {
      question: 'What types of cookies do you use?',
      answer: 'We use necessary, performance, functionality, and targeting cookies.',
    },
    {
      question: 'How do cookies improve my shopping experience?',
      answer: 'Cookies remember your cart, login status, and preferences for a smoother shopping journey.',
    },
    {
      question: 'Can I delete cookies stored by Store1920?',
      answer: 'Yes, you can clear cookies anytime through your browser’s privacy settings.',
    },
    {
      question: 'Where can I learn more about your cookie policy?',
      answer: 'Visit our Privacy Policy page for detailed information about cookies and data usage.',
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
        Cookies FAQs
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

export default Cookies;
