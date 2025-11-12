import React, { useState } from 'react';

const SupplierInfo = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How can I become a supplier for Store1920?',
      answer: 'You can apply to become a supplier by filling out the supplier application form available on our website.',
    },
    {
      question: 'What are the supplier requirements?',
      answer: 'Suppliers must comply with our quality standards, provide product certifications, and meet delivery timelines.',
    },
    {
      question: 'How long does the supplier approval process take?',
      answer: 'The approval process usually takes 2-4 weeks, including verification and contract signing.',
    },
    {
      question: 'Can international suppliers work with Store1920?',
      answer: 'Yes, we accept applications from both local and international suppliers.',
    },
    {
      question: 'What documents are required to register as a supplier?',
      answer: 'You will need to provide your business license, tax information, and product certifications.',
    },
    {
      question: 'How do I manage my product listings as a supplier?',
      answer: 'Suppliers get access to a portal where you can add, update, and manage your product listings.',
    },
    {
      question: 'What is the payment schedule for suppliers?',
      answer: 'Payments are made monthly, after successful delivery and quality checks.',
    },
    {
      question: 'Who can I contact for supplier support?',
      answer: 'Supplier support is available via email and phone. Contact details are provided after your application is approved.',
    },
    {
      question: 'Are there any fees associated with becoming a supplier?',
      answer: 'There are no upfront fees; however, commissions are applied on each sale as per the agreement.',
    },
    {
      question: 'Can suppliers participate in promotional campaigns?',
      answer: 'Yes, suppliers can opt to participate in Store1920 marketing campaigns to boost sales.',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Supplier Info FAQs</h3>
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

export default SupplierInfo;
