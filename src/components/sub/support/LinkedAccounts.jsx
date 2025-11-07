import React, { useState } from 'react';

const LinkedAccounts = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What are linked accounts?',
      answer: 'Linked accounts allow you to connect multiple Store1920 accounts or external accounts for easier login and management.',
    },
    {
      question: 'How do I link another account?',
      answer: 'Go to your account settings and find the "Linked Accounts" section to add or remove accounts.',
    },
    {
      question: 'Can I link social media accounts?',
      answer: 'Yes, you can link supported social media accounts like Google, Facebook, or Apple ID.',
    },
    {
      question: 'Is it safe to link my accounts?',
      answer: 'Yes, linking accounts is secure and uses encrypted authentication methods.',
    },
    {
      question: 'Will linked accounts share my personal information?',
      answer: 'No, your personal information remains private unless you choose to share it between linked accounts.',
    },
    {
      question: 'Can I unlink an account?',
      answer: 'Yes, you can unlink any linked account anytime from your account settings.',
    },
    {
      question: 'What happens if I unlink all accounts?',
      answer: 'You will need to use your primary login credentials to access your Store1920 account.',
    },
    {
      question: 'Can I link multiple accounts of the same type?',
      answer: 'Currently, only one account per provider can be linked at a time.',
    },
    {
      question: 'Does linking accounts affect my order history?',
      answer: 'No, order history remains separate for each account unless merged manually.',
    },
    {
      question: 'Who do I contact if I have issues with linked accounts?',
      answer: 'Contact Store1920 support for assistance with linking or unlinking accounts.',
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
        Linked Accounts FAQs
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

export default LinkedAccounts;
