import React from 'react';

const DeliveryGuarantee = () => {
  return (
    <div style={{ backgroundColor: '#f5fbf7', width: '100%', fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 10px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#2aa745', fontSize: '22px' }}>🛡️ Shop confidently with delivery guarantee</h2>
          <p style={{ fontSize: '15px', color: '#444', marginTop: '10px' }}>
            Store1920 works with reliable shipping partners around the world. We guarantee that your package will reach you
            safely and on time. If there are any problems during the transit of items you purchased, such as damage, loss,
            or delay, rest assured that we will do our best to solve the problems and provide the best solutions.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          padding: '0 10px'
        }}>
          {/* Credit for delay */}
          <div style={boxStyle}>
            <h3 style={titleStyle}>✔ Credit for delay</h3>
            <p>If your order is not delivered before or on the latest delivery date, you’ll be issued:</p>
            <ul style={ulStyle}>
              <li>AED20.00 credit for Standard Shipping</li>
              <li>AED20.00 credit for Pickup</li>
            </ul>
            <p>
              Credit will be added to your Store1920 account within 48 hours of the latest delivery date and usable on your next order.
            </p>
            <p style={smallNote}>
              Under special circumstances such as natural disasters, credits may not apply.
              <br />
              <a href="#" style={linkStyle}>See policy page &gt;</a>
            </p>
          </div>

          {/* Return if item damaged */}
          <div style={boxStyle}>
            <h3 style={titleStyle}>✔ Return if item damaged</h3>
            <p>
              If you receive your package and items are lost or damaged in transit, you can apply for a full refund.
              You may need to return damaged items before the refund is issued.
            </p>
          </div>

          {/* Refund for no update */}
          <div style={boxStyle}>
            <h3 style={titleStyle}>✔ Refund for no update</h3>
            <p>
              If no tracking updates are shown for a while and your package hasn’t arrived, apply for a reshipment or refund.
              If it arrives later, you can keep it without returning.
            </p>
            <ul style={ulStyle}>
              <li>15 days no updates (domestic)</li>
              <li>15 days no updates (overseas by air)</li>
              <li>15 days no updates (Cash on Delivery - overseas by air)</li>
            </ul>
            <p style={smallNote}>
              In rare force majeure events, refund might not be possible.
              <br />
              <a href="#" style={linkStyle}>See policy page &gt;</a>
            </p>
          </div>

          {/* Refund for no delivery */}
          <div style={boxStyle}>
            <h3 style={titleStyle}>✔ Refund for no delivery</h3>
            <p>
              If your package hasn’t arrived after a certain time, apply for a refund or reshipment.
              If it arrives late, you can still keep it for free.
            </p>
            <ul style={ulStyle}>
              <li>30 days (domestic)</li>
              <li>35 days (truck or 80kg+)</li>
              <li>40 days (overseas by air)</li>
              <li>40 days (Cash on Delivery - overseas by air)</li>
            </ul>
            <p style={smallNote}>
              In rare cases like disasters, refund or reshipment may not apply.
              <br />
              <a href="#" style={linkStyle}>See policy page &gt;</a>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '12px', color: '#777' }}>
          📌 These details are specific to United Arab Emirates. Details may vary by country.
        </p>
      </div>
    </div>
  );
};

// === Inline Styles ===
const boxStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  border: '1px solid #e1e1e1',
  fontSize: '14px',
  color: '#333',
  lineHeight: '1.6'
};

const titleStyle = {
  color: '#2aa745',
  fontSize: '16px',
  marginBottom: '10px'
};

const ulStyle = {
  paddingLeft: '20px',
  marginTop: '10px',
  marginBottom: '10px'
};

const smallNote = {
  fontSize: '12px',
  color: '#666',
  marginTop: '10px'
};

const linkStyle = {
  color: '#2a7ae2',
  textDecoration: 'none'
};

export default DeliveryGuarantee;
