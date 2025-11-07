import React from 'react';

const PartnerWithStore1920 = () => {
  const sectionStyle = {
    padding: '70px 20px',
    minHeight: '65vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    fontFamily: "'Montserrat', sans-serif",
    color: '#222',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '12px',
  };

  const titleStyle = {
    fontSize: '34px',
    fontWeight: '800',
    marginBottom: '20px',
    color: '#222',
  };

  const paragraphStyle = {
    fontSize: '16px',
    color: '#444',
    marginBottom: '18px',
    maxWidth: '850px',
    margin: '0 auto 24px',
    lineHeight: '1.7',
  };

  const linkStyle = {
    color: '#ff6a00',
    textDecoration: 'underline',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  };

  const cardWrapper = {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '50px',
    flexWrap: 'wrap',
  };

  const cardStyle = {
    background: '#fff',
    borderRadius: '14px',
    padding: '28px 24px',
    width: '320px',
    boxShadow: '0 6px 12px rgba(255, 106, 0, 0.15)',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  };

  const cardHover = {
    transform: 'translateY(-6px)',
    boxShadow: '0 12px 24px rgba(255, 106, 0, 0.3)',
  };

  const cardIcon = {
    fontSize: '40px',
    color: '#ff6a00',
  };

  const cardHeading = {
    fontWeight: '700',
    fontSize: '18px',
    color: '#222',
  };

  const cardText = {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.6',
  };

  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>Partner with Store1920</h2>
      <p style={paragraphStyle}>
        Store1920 collaborates with innovative brands and logistics providers to deliver the best tech, lifestyle, and consumer products to customers worldwide.
      </p>
      <p style={paragraphStyle}>
        We're always seeking new partnerships with manufacturers, wholesale vendors, and global shipping services.
      </p>
      <p style={paragraphStyle}>
        Review our{' '}
        <a href="#" style={linkStyle}
          onMouseEnter={e => (e.target.style.color = '#cc4b00')}
          onMouseLeave={e => (e.target.style.color = '#ff6a00')}>
          Code of Conduct
        </a>{' '}
        and{' '}
        <a href="#" style={linkStyle}
          onMouseEnter={e => (e.target.style.color = '#cc4b00')}
          onMouseLeave={e => (e.target.style.color = '#ff6a00')}>
          Human Rights Policy
        </a>{' '}
        to learn about our values and operational standards.
      </p>

      <p style={{ ...paragraphStyle, fontWeight: '600', color: '#222', maxWidth: '900px' }}>
        Why Partner with Us?
      </p>
      <ul style={{ maxWidth: '600px', margin: '0 auto 40px', textAlign: 'left', color: '#555', fontSize: '15px', lineHeight: '1.7' }}>
        <li>🔸 Access a wide and growing global customer base</li>
        <li>🔸 Benefit from our efficient, reliable logistics network</li>
        <li>🔸 Collaborate on exclusive products and marketing campaigns</li>
        <li>🔸 Join a community dedicated to innovation and quality</li>
      </ul>

      <div style={cardWrapper}>
        {[{
          icon: '🏪',
          heading: 'Merchandise & Product Vendors',
          text: (
            <>
              Do you have a product to showcase on Store1920? Reach out to our sourcing team at: <br />
              <a href="mailto:merchandise@db.store1920.com" style={linkStyle}>merchandise@db.store1920.com</a>
            </>
          )
        },
        {
          icon: '🚚',
          heading: 'Shipping & Logistics Providers',
          text: (
            <>
              Help us reach customers faster with efficient logistics. Contact: <br />
              <a href="mailto:shipping@db.store1920.com" style={linkStyle}>shipping@db.store1920.com</a>
            </>
          )
        },
        {
          icon: '🤝',
          heading: 'Affiliate & Brand Partnerships',
          text: (
            <>
              Build brand synergy with us! Co-market or create exclusive launches: <br />
              <a href="mailto:partners@db.store1920.com" style={linkStyle}>partners@db.store1920.com</a>
            </>
          )
        }].map((card, idx) => (
          <div
            key={idx}
            style={{
              ...cardStyle,
              ...(hoveredCard === idx ? cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={cardIcon}>{card.icon}</div>
            <div>
              <div style={cardHeading}>{card.heading}</div>
              <p style={cardText}>{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnerWithStore1920;
