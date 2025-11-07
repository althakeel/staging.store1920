import React from 'react';
import { FaShareAlt, FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import '../assets/styles/ShareDropdown.css';

export default function ShareDropdown({ url }) {
  return (
    <div className="share-dropdown">
      <FaShareAlt className="share-icon" />
      <div className="share-list">
        <a href={`https://facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${url}`} target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href={`https://api.whatsapp.com/send?text=${url}`} target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`} target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
}
