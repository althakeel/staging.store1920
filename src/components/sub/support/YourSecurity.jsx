import React, { useState } from 'react';

const YourSecurity = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How does Store1920 protect my personal information?',
      answer: 'We use industry-standard encryption and security protocols to safeguard your data.',
    },
    {
      question: 'What should I do if I suspect my account has been hacked?',
      answer: 'Change your password immediately and contact our support team for assistance.',
    },
    {
      question: 'Does Store1920 offer two-factor authentication?',
      answer: 'Yes, you can enable two-factor authentication in your account settings for added security.',
    },
    {
      question: 'How can I recognize phishing emails from Store1920?',
      answer: 'Official emails will never ask for your password or sensitive info. Check sender details carefully.',
    },
    {
      question: 'Is it safe to use Store1920 on public Wi-Fi?',
      answer: 'Public Wi-Fi networks can be risky; use a VPN or avoid sensitive transactions on unsecured networks.',
    },
    {
      question: 'What measures does Store1920 take against fraud?',
      answer: 'We monitor transactions for suspicious activity and work with banks to prevent fraud.',
    },
    {
      question: 'Can I control what notifications I receive?',
      answer: 'Yes, adjust your notification preferences in the account settings.',
    },
    {
      question: 'How does Store1920 handle data breaches?',
      answer: 'In the unlikely event of a breach, we notify affected users promptly and take necessary actions.',
    },
    {
      question: 'What should I do if I receive scam text messages claiming to be Store1920?',
      answer: 'Do not respond or click links. Report the message to our support team immediately.',
    },
    {
      question: 'How often should I update my password?',
      answer: 'We recommend updating your password every 3-6 months for optimal security.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Your Security FAQs</h3>
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          style={{
            ...faqItemStyle,
            backgroundColor: activeIndex === idx ? '#f9f9f9' : 'transparent',
            borderBottom: idx === faqs.length - 1 ? '1px solid #ddd' : '',
          }}
          onClick={() => toggleFAQ(idx)}
        >
          <div style={faqQuestionStyle}>{faq.question}</div>
          {activeIndex === idx && <div style={faqAnswerStyle}>{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default YourSecurity;
