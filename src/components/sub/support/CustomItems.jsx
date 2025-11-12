import React, { useState } from 'react';

const CustomItems = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What are custom items?',
      answer: 'Custom items are products tailored to your specific requirements or designs.',
    },
    {
      question: 'How can I request a custom item?',
      answer: 'Use our custom order form or contact customer support to submit your request details.',
    },
    {
      question: 'Is there a minimum order quantity for custom items?',
      answer: 'Minimum order quantities vary depending on the product and complexity. Contact us for details.',
    },
    {
      question: 'How long does it take to produce custom items?',
      answer: 'Production times vary but typically range from 2 to 6 weeks depending on the order.',
    },
    {
      question: 'Can I see a sample before placing a full order?',
      answer: 'Yes, we can provide samples or prototypes upon request, sometimes with an additional fee.',
    },
    {
      question: 'What are the costs involved with custom items?',
      answer: 'Costs depend on materials, design complexity, and quantity. We provide a quote after consultation.',
    },
    {
      question: 'Can I cancel or modify a custom order?',
      answer: 'Changes or cancellations are possible before production begins; contact us as soon as possible.',
    },
    {
      question: 'Do custom items come with a warranty?',
      answer: 'Warranty terms vary by product; details will be provided with your custom order agreement.',
    },
    {
      question: 'How do I provide design files or specifications?',
      answer: 'You can upload design files through our custom order form or email them to our support team.',
    },
    {
      question: 'Are custom items returnable?',
      answer: 'Due to their personalized nature, custom items are typically non-returnable unless defective.',
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
        Custom Items FAQs
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

export default CustomItems;
