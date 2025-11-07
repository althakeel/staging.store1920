import React, { useState } from 'react';

const ResetPassword = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page, enter your email, and follow the instructions sent to you.',
    },
    {
      question: 'I didn’t receive the password reset email. What should I do?',
      answer: 'Check your spam/junk folder. If not there, try requesting again or contact support.',
    },
    {
      question: 'Can I reset my password without access to my email?',
      answer: 'No, for security reasons, password resets require access to the registered email account.',
    },
    {
      question: 'How long is the password reset link valid?',
      answer: 'The reset link is usually valid for 24 hours. After that, you’ll need to request a new one.',
    },
    {
      question: 'What should I do if I forgot my email used for the account?',
      answer: 'Try to recall or check previous communications. Contact support if you cannot access your email.',
    },
    {
      question: 'Can I use my old password when resetting?',
      answer: 'For security reasons, we recommend choosing a new password different from your previous ones.',
    },
    {
      question: 'Is my password reset secure?',
      answer: 'Yes, we use encrypted links and secure protocols to protect your account during reset.',
    },
    {
      question: 'What if my reset link shows “invalid” or “expired”?',
      answer: 'Request a new password reset link from the login page.',
    },
    {
      question: 'Can I reset my password from a mobile device?',
      answer: 'Yes, the password reset process is fully supported on mobile browsers.',
    },
    {
      question: 'How can I create a strong password?',
      answer: 'Use a mix of uppercase, lowercase, numbers, and symbols. Avoid common words or sequences.',
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
        Reset Password FAQs
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

export default ResetPassword;
