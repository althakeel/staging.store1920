import React, { useState } from 'react';

const AddCard = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What types of cards can I add?',
      answer: 'We accept Visa, Mastercard, American Express, and other major debit/credit cards.',
    },
    {
      question: 'Is it safe to save my card on this site?',
      answer: 'Yes, your card details are encrypted and stored securely using industry standards.',
    },
    {
      question: 'Can I add multiple cards to my account?',
      answer: 'Yes, you can add and manage multiple payment methods from your account settings.',
    },
    {
      question: 'Why was my card declined when adding?',
      answer: 'Please verify your card details and ensure it is active with sufficient balance.',
    },
    {
      question: 'Can I remove a card after adding it?',
      answer: 'Yes, go to your Payment Methods section and click "Remove" next to the card.',
    },
    {
      question: 'Do you store CVV information?',
      answer: 'For security reasons, we do not store CVV numbers.',
    },
    {
      question: 'What if my card has expired?',
      answer: 'You should remove the expired card and add your new updated card.',
    },
    {
      question: 'Is there any charge for storing my card?',
      answer: 'No, there are no fees for saving your card with us.',
    },
    {
      question: 'Can I use a prepaid card?',
      answer: 'Yes, prepaid cards with Visa or Mastercard logos are supported.',
    },
    {
      question: 'How do I set a default card?',
      answer: 'In the Payment Methods section, click "Set as default" next to the desired card.',
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

  return (
    <div style={containerStyle}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
        Add Card FAQs
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

export default AddCard;
