import React, { useState } from 'react';

const CourierInfo = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Which couriers does Store1920 use?',
      answer: 'We partner with major couriers including DHL, FedEx, UPS, and local postal services.',
    },
    {
      question: 'Can I choose a specific courier for my order?',
      answer: 'Courier selection depends on your location and shipping option chosen at checkout.',
    },
    {
      question: 'How do I track my shipment?',
      answer: 'Once your order ships, you will receive a tracking number via email and SMS.',
    },
    {
      question: 'What if my tracking number is not working?',
      answer: 'Please wait 24 hours for the courier system to update, then try again or contact support.',
    },
    {
      question: 'Do you offer express shipping?',
      answer: 'Yes, express shipping options are available during checkout for eligible locations.',
    },
    {
      question: 'What are the courier delivery hours?',
      answer: 'Delivery times depend on the courier and your location, usually during business hours.',
    },
    {
      question: 'Can I change the delivery address after shipment?',
      answer: 'Contact customer support immediately; address changes depend on courier policies.',
    },
    {
      question: 'What happens if I miss the delivery?',
      answer: 'Couriers usually leave a notice with instructions for rescheduling or pickup options.',
    },
    {
      question: 'Are shipments insured?',
      answer: 'Most shipments include basic insurance; additional coverage may be available for high-value items.',
    },
    {
      question: 'How do I report a lost or damaged shipment?',
      answer: 'Contact our support team with your order and tracking details for assistance.',
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
        Courier Information FAQs
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

export default CourierInfo;
