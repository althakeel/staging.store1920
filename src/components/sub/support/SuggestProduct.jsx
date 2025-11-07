import React, { useState } from 'react';

const SuggestProduct = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How can I suggest a new product to Store1920?',
      answer: 'You can suggest a product by filling out the suggestion form available in the "Request an item" section on our website.',
    },
    {
      question: 'Will Store1920 notify me if my suggested product is added?',
      answer: 'Yes, if you provide your contact details, we will notify you once your suggested product becomes available.',
    },
    {
      question: 'Are all product suggestions considered?',
      answer: 'We carefully review all suggestions, but cannot guarantee every product will be added due to various factors.',
    },
    {
      question: 'Can I suggest bulk or wholesale products?',
      answer: 'Yes, you can suggest bulk or wholesale items via the same suggestion process.',
    },
    {
      question: 'Is there a limit on the number of product suggestions?',
      answer: 'No, you can suggest as many products as you want, but please provide clear and relevant details for each.',
    },
    {
      question: 'How long does it take to review product suggestions?',
      answer: 'Review times vary, but we strive to evaluate all suggestions within 2-4 weeks.',
    },
    {
      question: 'Can I suggest custom or personalized products?',
      answer: 'Absolutely! We welcome suggestions for custom and personalized items.',
    },
    {
      question: 'Do you require images or specifications for suggested products?',
      answer: 'Providing images or detailed specs helps us better understand your suggestion and increases the chance of approval.',
    },
    {
      question: 'Will my suggestion be public or private?',
      answer: 'All suggestions are treated confidentially and used internally to improve our product range.',
    },
    {
      question: 'Who can I contact for questions about product suggestions?',
      answer: 'For any inquiries, please reach out to our customer support via email or live chat.',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Suggest Product FAQs</h3>
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

export default SuggestProduct;
