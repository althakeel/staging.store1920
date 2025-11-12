import React, { useState } from 'react';

const ChangeEmail = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I change my email address?',
      answer: 'Go to your account settings and select "Change Email." Enter your new email and confirm.',
    },
    {
      question: 'Will changing my email affect my order history?',
      answer: 'No, your order history remains linked to your account regardless of email changes.',
    },
    {
      question: 'Do I need to verify my new email?',
      answer: 'Yes, after updating, a verification link will be sent to your new email address.',
    },
    {
      question: 'What if I don’t receive the verification email?',
      answer: 'Check your spam or junk folder. If still missing, request the verification email again.',
    },
    {
      question: 'Can I change my email to one already in use?',
      answer: 'No, each email must be unique. If your desired email is taken, please choose another.',
    },
    {
      question: 'Is my personal information safe during email changes?',
      answer: 'Absolutely. All changes are secured and encrypted to protect your data.',
    },
    {
      question: 'Will I stay logged in after changing my email?',
      answer: 'Yes, you will remain logged in but may be asked to re-authenticate for security reasons.',
    },
    {
      question: 'Can I change my email from the mobile app?',
      answer: 'Yes, the mobile app supports email updates in the account settings section.',
    },
    {
      question: 'What if I no longer have access to my old email?',
      answer: 'You can still update your email via account settings, but verification will be sent to the new address.',
    },
    {
      question: 'Who do I contact if I have issues changing my email?',
      answer: 'Contact our support team via chat or email for assistance with email changes.',
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
        Change Email FAQs
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

export default ChangeEmail;
