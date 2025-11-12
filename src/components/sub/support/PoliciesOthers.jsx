import React, { useState } from 'react';

const PoliciesOthers = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is Store1920’s Privacy Policy?',
      answer: 'Our Privacy Policy explains how we collect, use, and protect your personal information. You can view it in full on our website.',
    },
    {
      question: 'How do you handle cookies on Store1920?',
      answer: 'We use cookies to enhance your experience, remember preferences, and analyze site traffic. You can manage cookies in your browser settings.',
    },
    {
      question: 'What are the Terms of Service?',
      answer: 'The Terms of Service govern your use of our site and services. They include your rights, responsibilities, and limitations.',
    },
    {
      question: 'How does Store1920 handle user data security?',
      answer: 'We implement advanced security measures including encryption and regular audits to protect your data.',
    },
    {
      question: 'What is Store1920’s refund policy?',
      answer: 'Refunds are processed according to the Return & Refund section. Please review it for detailed steps and timelines.',
    },
    {
      question: 'Are there any restrictions on using the site?',
      answer: 'Users must comply with all applicable laws and not misuse the platform. See the User Agreement for details.',
    },
    {
      question: 'How does Store1920 handle community behavior?',
      answer: 'We expect respectful interaction. Our Community Rules outline unacceptable behaviors and consequences.',
    },
    {
      question: 'Where can I find Store1920’s legal notices?',
      answer: 'Legal notices, including intellectual property and liability disclaimers, are available in the Legal section on our website.',
    },
    {
      question: 'How are disputes resolved?',
      answer: 'Disputes are generally resolved through negotiation and arbitration, as described in the Terms of Service.',
    },
    {
      question: 'Can policies change without notice?',
      answer: 'We may update policies occasionally. We encourage users to review them regularly for changes.',
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
        Policies & Others FAQs
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

export default PoliciesOthers;
