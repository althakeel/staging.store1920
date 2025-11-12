import React, { useState } from 'react';

const Legal = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What are the terms and conditions of using Store1920?',
      answer: 'Our terms and conditions outline your rights and responsibilities when using our services. Please read them carefully on our Terms of Service page.',
    },
    {
      question: 'How do you protect my personal information?',
      answer: 'We follow strict data protection policies and use encryption to secure your data. See our Privacy Policy for details.',
    },
    {
      question: 'Can I use Store1920 content for my own purposes?',
      answer: 'All content on Store1920 is protected by copyright and cannot be used without permission.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'Refunds are issued according to our Return & Refund policy. Contact support for assistance.',
    },
    {
      question: 'How do you handle disputes?',
      answer: 'We strive to resolve all disputes amicably. If needed, arbitration or legal proceedings will follow as per our agreement.',
    },
    {
      question: 'Are there any prohibited items on Store1920?',
      answer: 'Yes, certain items such as illegal goods or counterfeit products are strictly prohibited.',
    },
    {
      question: 'Can Store1920 modify its policies?',
      answer: 'Yes, we reserve the right to update policies at any time. Changes will be posted on the website.',
    },
    {
      question: 'What laws govern the use of Store1920?',
      answer: 'Our services are governed by the laws of the United Arab Emirates.',
    },
    {
      question: 'Do you comply with international laws?',
      answer: 'Yes, we comply with applicable international trade and consumer protection laws.',
    },
    {
      question: 'How can I contact legal support?',
      answer: 'You can contact our legal department via the support contact form for any legal inquiries.',
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
        Legal FAQs
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

export default Legal;
