import React, { useState } from 'react';
import '../../../assets/styles/support/RecommendedTopics.css';

const faqs = [
  {
    question: 'How to return or exchange an item on Store1920?',
    answer:
      'Go to "My Orders," select the item, and choose the return or exchange option. Follow the prompts to download a return label and ship your item back.'
  },
  {
    question: 'My tracking info says my package was delivered, but I haven\'t received it.',
    answer:
      'Check your front door, mailbox, or with neighbors. If still missing, contact Store1920 within 3 days to investigate the issue.'
  },
  {
    question: 'How do I ship my items back?',
    answer:
      'Use the return label provided after starting a return. Package your items securely and drop them off with the assigned courier.'
  },
  {
    question: 'What should I do if I am missing item(s) from my order?',
    answer:
      'Some items ship separately. If something is missing, wait 1–2 days, then contact support if it still hasn’t arrived.'
  },
  {
    question: 'Why can\'t I find my order in my account?',
    answer:
      'Make sure you’re logged into the right Store1920 account. Orders placed while logged out may not appear. Check email for confirmations.'
  },
  {
    question: 'How do I track my refund?',
    answer:
      'Refunds are usually processed in 5–10 business days. Track your refund status in the Store1920 app under "Returns & Refunds."'
  },
  {
    question: 'How do I change the notification settings?',
    answer:
      'Go to “Settings” > “Notifications” in your Store1920 app to control email, SMS, and app notification preferences.'
  },
  {
    question: 'What if I received an item damaged or not as described?',
    answer:
      'Initiate a return or report the problem through “My Orders.” Upload photos and describe the issue for quicker help.'
  },
  {
    question: 'Protect Yourself from Spam Text Messages and Phishing Scams',
    answer:
      'Store1920 will never ask for passwords or personal info via text or email. Avoid clicking on suspicious links. Report scams immediately.'
  },
  {
    question: 'Is it safe to shop on Store1920? How will my information be used?',
    answer:
      'Yes. Store1920 uses secure encryption for transactions and never shares your personal data without permission.'
  }
];

const RecommendedTopics = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="recommended-topics">
      <h3>Unknown charges</h3>
      <p><strong>The unknown charge is a bank authorization</strong></p>
      <p>
        When you place an order, Store1920 contacts the issuing bank to confirm the validity of the payment method. 
        Your bank reserves the funds until the transaction processes or the authorization expires. 
        This reservation appears immediately in your statement, but it isn't an actual charge.
      </p>
      <p>
        If you cancel your order, the authorization is removed from your account according to the policies of your bank. 
        Contact your bank to clarify how long they hold authorizations for online orders.
      </p>

      <h4>I see a charge on my credit card that I don't recognize</h4>
      <p>
        If you see a purchase or credit card charge you don't recognize, check with any family members, friends or coworkers 
        who may have had access to your device or permission to use your card.
      </p>
      <p>
        If you believe your Store1920 account has been compromised, sign in to change your password. 
        From your Account security, Edit the Password and change your Store1920 password.
      </p>
      <p>
        If you still need help, you'll be asked to provide as much information as possible to help us resolve your issue. 
        For your security, please don't include your full bank account information.
      </p>

      <div className="feedback-check">
        <p><strong>Is this helpful for you?</strong></p>
        <button>Yes</button>
        <button>No</button>
      </div>

      <h3>Report Something Suspicious on Store1920</h3>

      <div className="faq-section">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>

      <h4>Still can't solve the problem?</h4>
    </div>
  );
};

export default RecommendedTopics;
