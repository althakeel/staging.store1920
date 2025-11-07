import React, { useState } from 'react';

const HowToReturn = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I start a return?',
      answer: 'Go to "My Orders", select the item you want to return, and click "Start Return". Follow the instructions to print your return label.',
    },
    {
      question: 'What is the return window?',
      answer: 'Most items can be returned within 30 days of delivery. Some items may have different return policies.',
    },
    {
      question: 'Can I return items purchased on sale?',
      answer: 'Yes, sale items are eligible for returns unless otherwise specified in the product description.',
    },
    {
      question: 'Do I need the original packaging to return?',
      answer: 'It is recommended to return items in their original packaging to avoid damage during transit.',
    },
    {
      question: 'Who pays for return shipping?',
      answer: 'Return shipping costs are covered by the customer unless the item is defective or wrong.',
    },
    {
      question: 'How long does a return take to process?',
      answer: 'Returns are usually processed within 5-7 business days after the item is received at our warehouse.',
    },
    {
      question: 'Can I exchange an item instead of returning?',
      answer: 'Yes, you can request an exchange by starting a return and noting your desired replacement item.',
    },
    {
      question: 'What if the item is damaged or defective?',
      answer: 'Please report the issue within 7 days of delivery. We will arrange a free return and replacement or refund.',
    },
    {
      question: 'Can I cancel a return request?',
      answer: 'Returns can be canceled before the item is shipped back. Contact support as soon as possible.',
    },
    {
      question: 'How do I get a refund?',
      answer: 'Once your return is approved and processed, refunds will be issued to your original payment method.',
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
        How To Return FAQs
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

export default HowToReturn;
