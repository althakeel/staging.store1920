import React, { useState } from 'react';

const Reviewsstore1920 = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How can I leave a review on Store1920?',
      answer: 'After receiving your order, go to the product page and click "Write a Review." Fill in your feedback and submit.',
    },
    {
      question: 'Can I edit my review after submission?',
      answer: 'Yes, you can edit your review within 7 days of posting by visiting your account reviews section.',
    },
    {
      question: 'Are reviews verified on Store1920?',
      answer: 'Yes, we verify that reviews come from customers who purchased the product to ensure authenticity.',
    },
    {
      question: 'What should I do if I want to report a fake review?',
      answer: 'Please report suspicious reviews by contacting our support team with the review details.',
    },
    {
      question: 'How long does it take for my review to appear?',
      answer: 'Reviews typically appear within 24 hours after moderation for quality assurance.',
    },
    {
      question: 'Can I leave reviews anonymously?',
      answer: 'No, reviews must be linked to a registered Store1920 account for authenticity.',
    },
    {
      question: 'What types of content are not allowed in reviews?',
      answer: 'Reviews with offensive language, spam, or irrelevant content are not permitted and may be removed.',
    },
    {
      question: 'Can I add photos to my review?',
      answer: 'Yes, you can upload photos with your review to help other shoppers.',
    },
    {
      question: 'Do reviews impact product rankings?',
      answer: 'Yes, products with higher ratings and more reviews tend to rank better in search results.',
    },
    {
      question: 'How do I respond to a negative review?',
      answer: 'If you receive a negative review, consider responding politely and offering solutions via customer service.',
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
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
        Reviews FAQs
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

export default Reviewsstore1920;
