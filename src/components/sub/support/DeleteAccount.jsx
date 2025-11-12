import React, { useState } from 'react';

const DeleteAccount = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I delete my Store1920 account?',
      answer: 'You can delete your account by going to Account Settings > Delete Account, or by contacting support.',
    },
    {
      question: 'What happens to my data when I delete my account?',
      answer: 'All your personal data and order history will be permanently removed according to our privacy policy.',
    },
    {
      question: 'Can I recover my account after deletion?',
      answer: 'No, account deletion is permanent and cannot be reversed. Please be sure before you delete.',
    },
    {
      question: 'Will I lose access to my orders if I delete my account?',
      answer: 'Yes, deleting your account removes access to all your order details and history.',
    },
    {
      question: 'How long does account deletion take?',
      answer: 'Account deletion is usually processed immediately but may take up to 24 hours to complete fully.',
    },
    {
      question: 'Can I delete my account through the mobile app?',
      answer: 'Yes, the option to delete your account is available in the app under Settings > Privacy.',
    },
    {
      question: 'What if I have pending orders when I delete my account?',
      answer: 'Please complete or cancel all pending orders before deleting your account to avoid issues.',
    },
    {
      question: 'Are subscriptions cancelled when I delete my account?',
      answer: 'Yes, all active subscriptions will be cancelled upon account deletion.',
    },
    {
      question: 'Do I get a confirmation before my account is deleted?',
      answer: 'Yes, you will be asked to confirm your decision before any data is deleted.',
    },
    {
      question: 'Who can I contact if I face issues deleting my account?',
      answer: 'Contact our customer support team via email or live chat for assistance with account deletion.',
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
        Delete Account FAQs
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

export default DeleteAccount;
