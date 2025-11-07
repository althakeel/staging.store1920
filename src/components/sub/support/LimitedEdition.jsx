import React, { useState } from 'react';

const LimitedEdition = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What does "Limited Edition" mean?',
      answer: 'Limited Edition products are produced in limited quantities, making them rare and exclusive.',
    },
    {
      question: 'How can I be sure the item is truly limited?',
      answer: 'We provide certificates or special numbering on limited edition items to verify their authenticity.',
    },
    {
      question: 'Are limited edition products more expensive?',
      answer: 'Often, yes, due to their rarity and exclusive features.',
    },
    {
      question: 'Can I return a limited edition product?',
      answer: 'Return policies apply as usual; however, some limited editions might have special terms. Please check the product page.',
    },
    {
      question: 'Will limited edition products be restocked?',
      answer: 'No, once sold out, limited edition items are typically not restocked.',
    },
    {
      question: 'Do limited editions come with special packaging?',
      answer: 'Yes, they often include unique packaging or accessories.',
    },
    {
      question: 'Can I preorder a limited edition product?',
      answer: 'Preorders may be available depending on the product. Check the product listing for details.',
    },
    {
      question: 'Are limited edition products eligible for discounts?',
      answer: 'Discounts on limited edition items are rare but occasional promotions may apply.',
    },
    {
      question: 'How do I know when a new limited edition is released?',
      answer: 'Subscribe to our newsletter or follow our social media for announcements.',
    },
    {
      question: 'Are limited edition items collectible?',
      answer: 'Yes, many collectors seek limited edition products due to their exclusivity.',
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
        Limited Edition FAQs
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

export default LimitedEdition;
