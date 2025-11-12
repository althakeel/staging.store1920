import React from 'react';
import preloaderGif from '../../assets/images/Preloader.gif'; // ✅ correct relative path

const Preloader = () => {
  return (
    <div style={styles.overlay}>
      <img src={preloaderGif} alt="Loading..." style={styles.image} />
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  image: {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
  },
};

export default Preloader;
