import React, { useState } from 'react';

const MissedDelivery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What should I do if I missed my delivery?',
      answer: 'Check your delivery notice for reschedule instructions or contact the courier directly to arrange a new delivery time.',
    },
    {
      question: 'How can I track my missed delivery?',
      answer: 'Use the tracking number on the courier’s website to find updates about your package’s current status.',
    },
    {
      question: 'Will the courier attempt delivery again?',
      answer: 'Most couriers make 1-2 additional delivery attempts before returning the package to the sender.',
    },
    {
      question: 'Can I pick up my package from the courier office?',
      answer: 'Yes, you can usually pick up your package at the local courier facility if you prefer.',
    },
    {
      question: 'How long will the courier hold my missed package?',
      answer: 'Packages are generally held for 5-7 business days before being returned to the sender.',
    },
    {
      question: 'Will I be notified about missed deliveries?',
      answer: 'Yes, couriers typically leave a delivery notice or send an email/SMS alert about missed deliveries.',
    },
    {
      question: 'Can I reschedule a missed delivery?',
      answer: 'Most couriers allow you to reschedule delivery online or by calling their customer service.',
    },
    {
      question: 'What happens if my package is returned to sender?',
      answer: 'You will need to contact Store1920 support to arrange a re-shipment or refund.',
    },
    {
      question: 'Does Store1920 charge extra for re-delivery?',
      answer: 'Re-delivery charges depend on the courier and your location; check with our support for details.',
    },
    {
      question: 'How can I avoid missed deliveries in the future?',
      answer: 'Provide accurate delivery details and use courier tracking to be available during delivery windows.',
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
        Missed Delivery FAQs
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

export default MissedDelivery;
