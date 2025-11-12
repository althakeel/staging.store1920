import React, { useState } from 'react';

const ProductStock = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I know if a product is in stock?',
      answer: 'The product page displays current stock status near the price and “Add to Cart” button.',
    },
    {
      question: 'What happens if a product is out of stock?',
      answer: 'Out of stock products cannot be purchased but you can sign up for restock alerts if available.',
    },
    {
      question: 'Can I pre-order items that are out of stock?',
      answer: 'Pre-order availability varies by product. Check the product description or contact support for details.',
    },
    {
      question: 'How often is stock updated?',
      answer: 'Stock levels update in real-time as orders are placed and inventory is managed.',
    },
    {
      question: 'Can stock availability vary by location?',
      answer: 'Yes, some items may have different stock levels based on your shipping location.',
    },
    {
      question: 'Do you offer backorder options?',
      answer: 'Backorders may be possible for select items; this information will be noted on the product page.',
    },
    {
      question: 'How can I get notified when an item is back in stock?',
      answer: 'Use the “Notify Me” feature on the product page to receive email alerts once the item is available.',
    },
    {
      question: 'Why did I get a notification but still can’t order the product?',
      answer: 'Stock can change quickly. Notifications are sent as soon as stock is updated, but items may sell out fast.',
    },
    {
      question: 'Can I reserve stock by contacting support?',
      answer: 'Reservations are not guaranteed. We recommend ordering promptly when the product is available.',
    },
    {
      question: 'Are limited edition items restocked?',
      answer: 'Limited edition products are usually one-time releases and will not be restocked once sold out.',
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
        Product Stock FAQs
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

export default ProductStock;
