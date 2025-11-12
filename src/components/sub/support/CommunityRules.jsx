import React, { useState } from 'react';

const CommunityRules = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What behavior is expected from community members?',
      answer: 'Members should be respectful, polite, and refrain from harassment or hate speech.',
    },
    {
      question: 'Are there any restrictions on the types of content I can post?',
      answer: 'Yes, prohibited content includes illegal material, spam, and offensive or violent content.',
    },
    {
      question: 'Can I share links to external websites?',
      answer: 'Sharing relevant and safe links is allowed, but spamming or malicious links are prohibited.',
    },
    {
      question: 'What happens if I violate community rules?',
      answer: 'Violations may result in warnings, content removal, or account suspension depending on severity.',
    },
    {
      question: 'Are users allowed to create multiple accounts?',
      answer: 'No, multiple accounts are not allowed and may lead to account termination.',
    },
    {
      question: 'Can I report inappropriate behavior?',
      answer: 'Yes, use the report feature or contact moderators to report any rule violations.',
    },
    {
      question: 'Are commercial promotions allowed?',
      answer: 'Promotions and advertisements require prior approval and must comply with community guidelines.',
    },
    {
      question: 'How is user privacy protected in the community?',
      answer: 'We respect privacy and do not share personal information without consent.',
    },
    {
      question: 'Can I request content removal?',
      answer: 'Yes, contact support to request removal of your personal content or data.',
    },
    {
      question: 'How can I stay updated on community rule changes?',
      answer: 'Community rules updates will be communicated via email and posted on the community homepage.',
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
        Community Rules FAQs
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

export default CommunityRules;
