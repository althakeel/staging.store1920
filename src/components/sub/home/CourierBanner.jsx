import React from 'react';
// import Banner from '../../../assets/images/seasontitle/17.webp'

const CourierBanner = () => {
  return (
    <section style={{
      maxWidth: '1400px',
      width: '100%',
      margin: '20px auto',
      minHeight: '60px',
      backgroundColor: '#ffffffff',
      display: 'flex',
      justifyContent: 'flex-start'
    }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}>
        <img 
          style={{
            height: '50px',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'center center'
          }}
          src='https://db.store1920.com/wp-content/uploads/2025/11/Mini-1-scaled.webp' 
          alt="Courier Banner" 
        />
      </div>
    </section>
  );
};

export default CourierBanner;
