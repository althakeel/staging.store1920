import React, { useState } from 'react';

const ShippingOptions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What shipping options are available?',
      answer: 'We offer standard, expedited, and express shipping options depending on your location.',
    },
    {
      question: 'How do I choose a shipping option?',
      answer: 'You can select your preferred shipping method during the checkout process.',
    },
    {
      question: 'Is express shipping faster than expedited?',
      answer: 'Yes, express shipping is our fastest option and usually delivers within 1-2 business days.',
    },
    {
      question: 'Are there additional costs for expedited shipping?',
      answer: 'Yes, expedited and express shipping options usually come with higher fees than standard shipping.',
    },
    {
      question: 'Can I upgrade my shipping after placing an order?',
      answer: 'Shipping upgrades after order placement depend on order status. Contact support for help.',
    },
    {
      question: 'Do all products qualify for all shipping options?',
      answer: 'Some items may have restrictions on shipping methods due to size, weight, or regulations.',
    },
    {
      question: 'How is the shipping cost calculated?',
      answer: 'Shipping cost depends on your selected option, package weight, and destination.',
    },
    {
      question: 'Is shipping free for any option?',
      answer: 'Free standard shipping is available for orders over a certain amount, check the site for current promotions.',
    },
    {
      question: 'Will I get a tracking number for expedited shipping?',
      answer: 'Yes, all shipping options include a tracking number sent via email once your order ships.',
    },
    {
      question: 'What if my shipping option is not available at checkout?',
      answer: 'Some shipping options may be unavailable for your address or items. Contact support for alternatives.',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Shipping Options FAQs</h3>
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

export default ShippingOptions;
