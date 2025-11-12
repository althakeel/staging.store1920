import React, { useState } from 'react';

const TwoFactorAuth = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is two-factor authentication (2FA)?',
      answer: '2FA adds an extra layer of security by requiring a second form of verification besides your password.',
    },
    {
      question: 'How do I enable two-factor authentication on Store1920?',
      answer: 'Go to Account Settings > Security, and follow the instructions to activate 2FA using an authenticator app or SMS.',
    },
    {
      question: 'Can I use Google Authenticator or Authy for 2FA?',
      answer: 'Yes, both Google Authenticator and Authy are supported for generating your verification codes.',
    },
    {
      question: 'What if I lose access to my 2FA device?',
      answer: 'Use your backup codes provided during setup, or contact customer support to verify your identity and regain access.',
    },
    {
      question: 'Is 2FA mandatory on Store1920?',
      answer: 'Currently, 2FA is optional but highly recommended for enhanced account security.',
    },
    {
      question: 'How often will I be prompted for 2FA?',
      answer: 'You’ll be asked for the code when signing in from a new device or after a password reset.',
    },
    {
      question: 'Can I disable two-factor authentication?',
      answer: 'Yes, you can disable it from your security settings, but it is not recommended.',
    },
    {
      question: 'Does 2FA work with all login methods?',
      answer: '2FA applies to password-based logins but may not apply to some social logins depending on provider support.',
    },
    {
      question: 'Is SMS-based 2FA secure?',
      answer: 'SMS is better than no 2FA but less secure than authenticator apps due to risks like SIM swapping.',
    },
    {
      question: 'How do I update my phone number for 2FA?',
      answer: 'Update your phone number in Account Settings > Security to ensure 2FA codes are sent to the correct device.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const containerStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '14px',
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
    fontSize: '14px',
  };

  const faqAnswerStyle = {
    marginTop: '8px',
    fontSize: '13px',
    color: '#555',
    display: 'block',
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Two-Factor Authentication FAQs</h3>
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

export default TwoFactorAuth;
