import React from 'react';
import '../../../assets/styles/LightningBanner.css';
import { useNavigate } from 'react-router-dom';

const LightningBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/lightningdeal');
  };

  return (
    <div
      className="lightning-banner"
      // onClick={handleClick}
      style={{ maxWidth: '1400px', margin: '0 auto', minHeight: '60px' }}
    >
      <div className="lightning-banner__content">
        <span className="icon"> </span>
        <strong className="title"></strong>
        <span className="subtitle"></span>
        <span className="arrow"></span>
      </div>
    </div>
  );
};

export default LightningBanner;
