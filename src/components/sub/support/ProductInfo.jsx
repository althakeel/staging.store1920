import React, { useState } from 'react';

const ProductInfo = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I find detailed information about a product?',
      answer: 'Each product page includes detailed descriptions, specifications, and customer reviews to help you make informed decisions.',
    },
    {
      question: 'Are product images accurate?',
      answer: 'We strive to provide clear, high-quality images that closely represent the actual product colors and details.',
    },
    {
      question: 'Can I get size or dimension details?',
      answer: 'Yes, most products include size charts or dimension information in the description or a dedicated tab.',
    },
    {
      question: 'What materials are used in the products?',
      answer: 'Material details are listed on the product page, including fabric types, metals, plastics, and more.',
    },
    {
      question: 'Are there warranty or guarantee details?',
      answer: 'Warranty information is provided where applicable; check the product description or packaging for details.',
    },
    {
      question: 'Can I request additional product information?',
      answer: 'Yes, you can contact our support team for any specific product inquiries or custom requests.',
    },
    {
      question: 'Do you provide product manuals or guides?',
      answer: 'Manuals, user guides, and care instructions are available for many products as downloadable PDFs or included in the package.',
    },
    {
      question: 'Are products genuine and authentic?',
      answer: 'All products sold on Store1920 are guaranteed authentic and sourced from authorized distributors.',
    },
    {
      question: 'How often is product information updated?',
      answer: 'We regularly update product details to reflect new information, stock changes, or improvements.',
    },
    {
      question: 'Can I compare products on the site?',
      answer: 'Yes, you can add products to the compare list to view side-by-side features and pricing.',
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
        Product Information FAQs
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

export default ProductInfo;
