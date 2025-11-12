import React, { useState } from 'react';

const ManagingAccount = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I update my personal information?',
      answer: 'Go to Account Settings > Profile to update your name, address, phone number, and other details.',
    },
    {
      question: 'How can I change my password?',
      answer: 'Navigate to Account Settings > Security > Change Password to update your password securely.',
    },
    {
      question: 'How do I enable two-factor authentication?',
      answer: 'In Security settings, enable Two-Factor Authentication to add an extra layer of security to your account.',
    },
    {
      question: 'What should I do if I forgot my password?',
      answer: 'Use the "Forgot Password" link on the sign-in page to reset your password via email.',
    },
    {
      question: 'Can I delete my account permanently?',
      answer: 'Yes, you can request account deletion from Account Settings > Privacy, but note this action is irreversible.',
    },
    {
      question: 'How do I manage my email preferences?',
      answer: 'Adjust your notification and email preferences in Account Settings > Notifications.',
    },
    {
      question: 'How can I link or unlink social accounts?',
      answer: 'Manage linked accounts under Account Settings > Linked Accounts to connect or disconnect social logins.',
    },
    {
      question: 'Is it possible to merge multiple accounts?',
      answer: 'Currently, merging accounts is not supported. Please contact support for assistance.',
    },
    {
      question: 'How do I update my billing information?',
      answer: 'Billing details can be updated in Account Settings > Payment Methods.',
    },
    {
      question: 'What security measures protect my account?',
      answer: 'We use encryption, two-factor authentication, and continuous monitoring to secure your account.',
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
        Managing Account FAQs
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

export default ManagingAccount;
