import React from 'react';

const privacyPolicy = () => {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20,fontFamily: 'Montserrat, sans-serif', lineHeight: 1.6,fontSize:'13px' }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: August 14, 2025</p>




<p>
Introduction: This Privacy Policy describes how Althakeel General Trading LLC (doing business as “Store1920,” referred to as “we,” “us,” or “our”) handles personal information that we collect through our digital properties, such as the store1920.com website and Store1920 mobile applications, and in the course of our business operations. We care deeply about your privacy and are committed to protecting your personal information. This policy explains what information we collect, how we use and share it, and the choices you have regarding your information. By using Store1920’s services, you agree to the terms of this Privacy Policy.
import React, { useEffect, useRef, useState } from 'react';
import React, { useEffect, useRef, useState } from 'react';

// Match the modern, sidebar design used in Returnandrefundpolicy.jsx
const injectFont = () => {
  if (!document.getElementById('montserrat-font')) {
    const link = document.createElement('link');
    link.id = 'montserrat-font';
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
};

const sections = [
  {
    id: 'defective-damaged',
    title: 'Defective or Damaged Product',
    content: (
      <>
        <p>
          If you receive a damaged or defective product, please return it in the same
          condition you received it, including the original intact box and packaging.
          Once we receive and inspect the item, we will refund the paid product value
          along with any shipping fees you paid.
        </p>
      </>
    ),
  },
  {
    id: 'wrong-product',
    title: 'Wrong Product Received',
    content: (
      <>
        <p>
          If the product you received is incorrect, return it in the same condition
          with the original intact box/packaging. Once received, we will refund the
          amount paid as long as the return is made within 15 days of delivery.
        </p>
      </>
    ),
  },
  {
    id: 'when-return-not-possible',
    title: 'When a Return Is Not Possible',
    content: (
      <>
        <ul>
          <li>Return request is made after 15 days from receipt.</li>
          <li>The product is used, damaged, or not in the same condition as received.</li>
          <li>Any consumable product that has been used or installed.</li>
          <li>Products with tampered or missing serial numbers.</li>
          <li>
            Anything missing from the original package: price tags, labels, packing,
            freebies, or accessories. Fragile and personal hygiene products are non-returnable.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'change-of-mind',
    title: 'Change of Mind',
    content: (
      <>
        <p>
          If you change your mind before your order ships, contact us to cancel. If you
          wish to return after receiving the product, you have up to 15 days, provided:
        </p>
        <ul>
          <li>The product is not on the non-returnable list.</li>
          <li>It is not a clearance item marked as non-returnable.</li>
          <li>
            Only items with unopened retail packaging (sealed/factory sealed) and their
            original seal intact can be returned.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'non-returnable',
    title: 'Non‑Returnable Products',
    content: (
      <>
        <ul>
          <li>Products from clearance sales clearly marked as non‑returnable.</li>
          <li>Items where the offer notes specifically state non‑returnable.</li>
          <li>Mobile phones (except cases of manufacturing defect).</li>
          <li>Any consumable products that have been used or installed.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'pickup-timeline',
    title: 'Return Pickup Timeline',
    content: (
      <>
        <p>
          A courier representative typically contacts you within 3–5 days after your
          return request. In some cases, pickup may take up to two weeks.
        </p>
      </>
    ),
  },
  {
    id: 'schedule-pickup',
    title: 'Scheduling the Pickup',
    content: (
      <>
        <p>
          You cannot contact the shipping company directly. When their representative
          reaches out, you can provide your preferred time for collection.
        </p>
      </>
    ),
  },
  {
    id: 'after-15-days',
    title: 'Returns After 15 Days',
    content: (
      <>
        <p>
          If you could not return within 15 days, contact support@store1920.com or use the
          “Contact Us” page to file a complaint. We review such cases individually. Any
          accepted return must still comply with consumer protection timelines.
        </p>
      </>
    ),
  },
  {
    id: 'card-refund',
    title: 'Refunds for Card Payments',
    content: (
      <>
        <p>
          For credit/debit card payments, refunds are issued back to the original card.
          Depending on your bank, the refund may take up to 30 days to appear on the
          statement.
        </p>
      </>
    ),
  },
  {
    id: 'cod-refund',
    title: 'Refunds for Cash on Delivery (COD)',
    content: (
      <>
        <p>
          After your return reaches our warehouse and passes inspection, the refund will
          be credited to your Store1920 wallet. You can use it for future purchases or
          request a bank transfer refund to your account.
        </p>
      </>
    ),
  },
  {
    id: 'own-courier',
    title: 'Using Your Own Courier',
    content: (
      <>
        <p>
          Currently, returns can only be arranged through our affiliated shipping
          partners. Personal drop‑offs or third‑party couriers aren’t supported.
        </p>
      </>
    ),
  },
  {
    id: 'who-pays',
    title: 'Who Pays Return Shipping?',
    content: (
      <>
        <p>
          If the reason is buyer’s remorse (no fault/defect in the product), the
          customer bears the shipping fees back and forth for the return.
        </p>
      </>
    ),
  },
];

const styles = {
  layout: {
    display: 'flex',
    fontFamily: "'Montserrat', sans-serif",
    maxWidth: '1400px',
    margin: '0 auto',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  sidebar: {
    width: '280px',
    padding: '40px 25px',
    borderRight: '1px solid #eee',
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',
  },
  sidebarItem: (active) => ({
    padding: '14px 0',
    cursor: 'pointer',
    borderLeft: active ? '4px solid #FF6600' : '4px solid transparent',
    paddingLeft: '14px',
    fontWeight: active ? '600' : '500',
    color: active ? '#FF6600' : '#333',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    userSelect: 'none',
  }),
  contentWrapper: {
    flex: 1,
    padding: '40px 60px',
    overflowY: 'auto',
    scrollBehavior: 'smooth',
  },
  section: {
    marginBottom: '80px',
    scrollMarginTop: '100px',
  },
  heading: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#222',
  },
  text: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#444',
  },
};

const ReturnPolicy = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const contentRef = useRef(null);

  useEffect(() => {
    injectFont();

    if (!contentRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: contentRef.current, rootMargin: '-50px 0px -60% 0px', threshold: 0.1 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el && contentRef.current) {
      contentRef.current.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        {sections.map(({ id, title }) => (
          <div key={id} onClick={() => scrollToSection(id)} style={styles.sidebarItem(activeSection === id)}>
            {title}
          </div>
        ))}
      </aside>

      <main style={styles.contentWrapper} ref={contentRef}>
        {sections.map(({ id, title, content }) => (
          <section key={id} id={id} style={styles.section}>
            <h2
              style={{
                ...styles.heading,
                textDecoration: activeSection === id ? 'underline' : 'none',
                textDecorationColor: '#FF6600',
                textDecorationThickness: '2px',
              }}
            >
              {title}
            </h2>
            <div style={styles.text}>{content}</div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default ReturnPolicy;
