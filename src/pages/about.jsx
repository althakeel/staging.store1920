import React from 'react';
import Abouticon from '../assets/images/about.png'
import Fastdelivery from '../assets/images/delivery.png'
import Commitment from '../assets/images/commetment-black.png'
import Selectionicon from '../assets/images/selection-black.png'



const Store1920Info = () => {
  const container = {
    fontFamily: "'Montserrat', sans-serif",
    maxWidth: 1000,
    margin: '70px auto',
    padding: '0 20px',
    color: '#222',
  };

  const topSection = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 40,
    marginBottom: 60,
    flexWrap: 'wrap',
  };

  const leftSide = {
    flex: '1 1 400px',
    minWidth: 300,
  };

  const heading = {
    fontSize: '1.5rem',
    fontWeight: '900',
    color: '#ff7b00ff',
    marginBottom: 20,
    lineHeight: 1.1,
  };

  const introText = {
    fontSize: '1rem',
    color: '#444',
    lineHeight: 1.6,
  };

  const rightSide = {
    flex: '1 1 400px',
    minWidth: 300,
  };

  const imageStyle = {
    width: '100%',
    borderRadius: 16,
    maxWidth:'250px',
    // boxShadow: '0 10px 30px rgba(0,102,255,0.15)',
  };

  const features = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 30,
    flexWrap: 'wrap',
  };

  const featureCard = {
    flex: '1 1 280px',
    backgroundColor: '#f5f5f5ff',
    borderRadius: 14,
    padding: 30,
    boxShadow: '0 8px 25px rgba(255, 255, 255, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const featureTitle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#ff5e00ff',
    marginTop: 20,
    marginBottom: 12,
  };

  const featureDesc = {
    fontSize: '1rem',
    color: '#444',
    lineHeight: 1.5,
  };

  return (
    <div style={container}>
      <section style={topSection}>
        <div style={leftSide}>
          <h1 style={heading}>Welcome to Store 1920 — Your Trusted Marketplace</h1>
          <p style={introText}>
            At Store 1920, we bring you closer to quality and craftsmanship by connecting you directly to authentic products from artisans and trusted brands worldwide.
            Shop with confidence, enjoy seamless delivery, and discover what makes us different.
          </p>
        </div>
        <div style={rightSide}>
          <img
            src= {Abouticon}
            alt="Store 1920 marketplace"
            style={imageStyle}
          />
        </div>
      </section>

      <section style={features}>
        <div style={featureCard}>
         <img src={Selectionicon} style={{maxWidth:"50px"}}/>
          <h3 style={featureTitle}>Vast Selection</h3>
          <p style={featureDesc}>
            Explore an ever-growing catalog of premium products tailored to your tastes and needs.
          </p>
        </div>

        <div style={featureCard}>
          <img src={Fastdelivery} style={{maxWidth:'50PX'}}/>
          <h3 style={featureTitle}>Fast & Reliable Shipping</h3>
          <p style={featureDesc}>
            Our streamlined logistics ensure your orders arrive quickly and safely, every time.
          </p>
        </div>

        <div style={featureCard}>
          <img src={Commitment} style={{maxWidth:'50PX'}}/>
          <h3 style={featureTitle}>Commitment to You</h3>
          <p style={featureDesc}>
            We put customers first, striving for excellence and integrity in all we do.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Store1920Info;
