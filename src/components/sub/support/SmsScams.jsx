import React, { useState } from 'react';

const SmsScams = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What are SMS scams?',
      answer: 'SMS scams are fraudulent text messages designed to trick you into giving personal information or clicking malicious links.',
    },
    {
      question: 'How can I identify a scam SMS?',
      answer: 'Look out for messages from unknown numbers, spelling mistakes, urgent requests, or suspicious links.',
    },
    {
      question: 'Should I click links in SMS messages?',
      answer: 'Avoid clicking links from unknown or suspicious senders to protect your data and device.',
    },
    {
      question: 'What to do if I receive a suspicious SMS?',
      answer: 'Do not reply or click links. Report the message to your mobile carrier and delete it immediately.',
    },
    {
      question: 'Can SMS scams lead to identity theft?',
      answer: 'Yes, scammers may use information obtained from SMS scams to steal your identity or commit fraud.',
    },
    {
      question: 'Are SMS scams common?',
      answer: 'Unfortunately, SMS scams are becoming more frequent worldwide, so always stay vigilant.',
    },
    {
      question: 'How can I protect myself from SMS scams?',
      answer: 'Never share personal or financial information via SMS and enable spam filtering on your phone if available.',
    },
    {
      question: 'What if I accidentally clicked a scam SMS link?',
      answer: 'Immediately disconnect from the internet, scan your device for malware, and change your passwords.',
    },
    {
      question: 'Can my mobile carrier help with SMS scams?',
      answer: 'Yes, many carriers provide tools to block spam messages and allow you to report scams.',
    },
    {
      question: 'Is Store1920 involved in SMS scams?',
      answer: 'No, Store1920 will never ask for personal details or passwords via SMS. Always verify with official channels.',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>SMS Scams FAQs</h3>
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

export default SmsScams;
