import React, { useState } from 'react';

const TrackShipment = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How can I track my shipment?',
      answer: 'Once your order ships, you will receive a tracking number via email or SMS to monitor the delivery.',
    },
    {
      question: 'What should I do if my tracking number is not working?',
      answer: 'Tracking numbers may take 24 hours to activate. If the issue persists, contact our support team.',
    },
    {
      question: 'Can I track international shipments?',
      answer: 'Yes, international shipments can be tracked but updates may be delayed depending on the courier.',
    },
    {
      question: 'What do I do if my shipment is delayed?',
      answer: 'Delays can happen due to weather or customs. Please check the courier website or contact support for assistance.',
    },
    {
      question: 'Will I get a notification when my package is out for delivery?',
      answer: 'Most couriers send delivery notifications via email or SMS if you opt in during checkout.',
    },
    {
      question: 'How do I track multiple shipments in one order?',
      answer: 'If your order ships in multiple packages, you will receive separate tracking numbers for each shipment.',
    },
    {
      question: 'What if the courier cannot deliver my package?',
      answer: 'They will typically leave a notice with instructions to reschedule delivery or pick up from a nearby location.',
    },
    {
      question: 'Can I change the delivery address after shipment?',
      answer: 'Changing the address depends on the courier’s policy; contact customer support as soon as possible.',
    },
    {
      question: 'How long does it take for tracking info to update?',
      answer: 'Tracking info updates vary but generally refresh every few hours on courier websites.',
    },
    {
      question: 'Who do I contact if my shipment is lost?',
      answer: 'Contact Store1920 customer support with your order and tracking details for assistance in investigation.',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Track Shipment FAQs</h3>
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

export default TrackShipment;
