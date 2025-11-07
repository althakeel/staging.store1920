import React, { useState } from 'react';

const SizeChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I find the right size?',
      answer: 'Check the measurements in our size chart to compare with your body measurements.',
    },
    {
      question: 'Are the sizes true to fit?',
      answer: 'Our sizes follow standard measurements, but some items may vary. Always refer to the specific size chart.',
    },
    {
      question: 'What if I am between sizes?',
      answer: 'We recommend choosing the larger size for a more comfortable fit.',
    },
    {
      question: 'How to measure my chest?',
      answer: 'Measure around the fullest part of your chest, keeping the tape parallel to the floor.',
    },
    {
      question: 'How to measure my waist?',
      answer: 'Measure around the narrowest part of your waist, usually above your belly button.',
    },
    {
      question: 'Do kids’ sizes differ from adult sizes?',
      answer: 'Yes, kids’ sizes are based on age and height, please refer to the kids size chart.',
    },
    {
      question: 'Can I exchange if the size doesn’t fit?',
      answer: 'Yes, please see our return & exchange policy for details on size exchanges.',
    },
    {
      question: 'Are there size charts for shoes?',
      answer: 'Yes, shoe size charts are available separately on the product pages.',
    },
    {
      question: 'What is the difference between slim fit and regular fit?',
      answer: 'Slim fit is more tapered and close to the body, while regular fit offers a looser cut.',
    },
    {
      question: 'Do you provide size charts for international customers?',
      answer: 'Yes, all size charts include conversions for US, UK, EU, and other international sizes.',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Size Chart FAQs</h3>
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

export default SizeChart;
