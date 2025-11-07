import React, { useState } from 'react';

const TemuCertifications = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What certifications does Store1920 have?',
      answer: 'Store1920 holds ISO 9001 for quality management and ISO 27001 for information security.',
    },
    {
      question: 'Are Store1920 products certified for safety?',
      answer: 'Yes, our products meet all relevant safety certifications depending on category and region.',
    },
    {
      question: 'How often are Store1920 certifications updated?',
      answer: 'Certifications are reviewed annually to ensure compliance with the latest standards.',
    },
    {
      question: 'Can I verify Store1920 certifications?',
      answer: 'Yes, you can view our certification documents on the Store1920 website under the "About Us" section.',
    },
    {
      question: 'Does Store1920 follow environmental certifications?',
      answer: 'We comply with environmental standards such as ISO 14001 and promote sustainable practices.',
    },
    {
      question: 'Are there certifications specific to food products?',
      answer: 'Yes, food products comply with HACCP and local health regulations.',
    },
    {
      question: 'How does Store1920 ensure data security certifications?',
      answer: 'We are certified with ISO 27001 and regularly conduct security audits.',
    },
    {
      question: 'Are third-party audits part of the certification process?',
      answer: 'Yes, all certifications are verified by accredited third-party organizations.',
    },
    {
      question: 'Does Store1920 have any ethical sourcing certifications?',
      answer: 'We follow Fair Trade and other ethical sourcing standards for selected products.',
    },
    {
      question: 'Where can I find Store1920 certification reports?',
      answer: 'Certification reports are available for download on our website’s certification page.',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Store1920 Certifications FAQs</h3>
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

export default TemuCertifications;
