import React, { useState } from 'react';

const ColorOptions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What color options are available for products?',
      answer: 'Most products come in a variety of colors. Check the product page for all available color options.',
    },
    {
      question: 'How do I select a color when ordering?',
      answer: 'On the product page, select your preferred color from the color swatches or dropdown menu before adding to cart.',
    },
    {
      question: 'Can I change the color of an item after placing an order?',
      answer: 'Unfortunately, color changes are not possible after order confirmation. You may cancel and reorder if needed.',
    },
    {
      question: 'Are the colors shown on the website accurate?',
      answer: 'We strive for accuracy, but actual colors may vary slightly due to screen settings and lighting conditions.',
    },
    {
      question: 'Do different colors affect the price?',
      answer: 'Typically, no. All colors of a product are priced the same unless specified otherwise.',
    },
    {
      question: 'Can I request a custom color?',
      answer: 'Custom color requests are not supported at this time. Please choose from the available options.',
    },
    {
      question: 'Will different colors have different availability?',
      answer: 'Yes, some colors may be out of stock or available in limited quantities.',
    },
    {
      question: 'Are product images available for all color options?',
      answer: 'We provide images for most popular colors; some colors may not have specific images.',
    },
    {
      question: 'Can I filter products by color?',
      answer: 'Yes, use the color filter on category pages to see items available in your preferred color.',
    },
    {
      question: 'What if I receive a product in the wrong color?',
      answer: 'Contact customer support immediately to arrange a return or exchange for the correct color.',
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
        Color Options FAQs
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

export default ColorOptions;
