import React, { useRef } from 'react';
import '../../assets/styles/supportDropdownMenu.css';
import Support from '../../assets/images/webicons/Header/Black/support-black.png'
import Safety from '../../assets/images/webicons/Header/Black/shield-black.png'
import Chat from '../../assets/images/saftycenter1.png'
import Protection from '../../assets/images/Purchaseprotection1.png'
import PrivacyPolicy from '../../assets/images/webicons/Header/Black/privacy-policy-black.png'
import Terms from '../../assets/images/webicons/Header/Black/terms-of-use-black.png'

const SupportDropdownMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);

  if (!isOpen) return null;

  const menuItems = [
    { label: 'Support Center', icon: Support, link: '/support' },
    { label: 'Safety Center', icon: Safety, link: '/safetycenter' },
    // { label: 'Chat with Store1920', icon: Chat, link: '/chat' },
    // { label: 'Store1920 Purchase Protection', icon: Protection, link: '/protection' },
    { label: 'Privacy Policy', icon: PrivacyPolicy, link: '/privacy-policy' },
    { label: 'Terms of Use', icon: Terms, link: '/Terms-0f-use' },
  ];

  return (
    <div
      className="support-dropdown-menu"
      onMouseEnter={() => {
        if (menuRef.current) clearTimeout(menuRef.current);
      }}
      onMouseLeave={() => {
        menuRef.current = setTimeout(onClose, 200);
      }}
    >
      <ul className="dropdown-list">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <a href={item.link} className="menu-link">
              <img src={item.icon} alt={item.label} className="icon-img" />
              <span className="label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupportDropdownMenu;
