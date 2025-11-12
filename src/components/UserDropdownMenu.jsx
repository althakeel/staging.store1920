import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/UserDropdownMenu.css';
import SignOutConfirmModal from './sub/SignOutConfirmModal';
import { useAuth } from '../contexts/AuthContext'; // ✅ import useAuth

import orderIcon from '../assets/images/webicons/Home/Black/add-tocart-black.png';
import reviewIcon from '../assets/images/Reviews 2.png';
import profileIcon from '../assets/images/webicons/Header/Black/profile-black.png';
import couponIcon from '../assets/images/webicons/Header/Black/coupon--black.png';
import notificationIcon from '../assets/images/webicons/Header/Black/Asset 13@6x.png';
import historyIcon from '../assets/images/webicons/Header/Black/Asset 10@6x.png';
import SignOut from '../assets/images/webicons/Header/Black/Asset 8@6x.png';

const UserDropdownMenu = ({
  isOpen,
  onClose,
  setUserDropdownOpen,
  setMobileMenuOpen,
  user
}) => {
  const { logout } = useAuth(); // ✅ use logout from AuthContext
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen || showConfirmModal) {
      clearTimeout(timeoutRef.current);
    }
  }, [isOpen, showConfirmModal]);

  const handleMouseLeave = () => {
    if (!showConfirmModal) {
      timeoutRef.current = setTimeout(onClose, 200);
    }
  };

  const handleSignOut = () => {
    setShowConfirmModal(false);
    logout(); // ✅ use AuthContext logout
    localStorage.removeItem('user'); // optional, depends on your AuthContext
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    onClose();
  };

  const menuItems = [
    { label: 'Your Orders', icon: orderIcon, link: '/myaccount/orders' },
    { label: 'Your Reviews', icon: reviewIcon, link: '/myaccount/reviews' },
    { label: 'Your Profile', icon: profileIcon, link: '/myaccount/profile' },
    { label: 'Coupons & Offers', icon: couponIcon, link: '/myaccount/coupons' },
    { label: 'Notifications', icon: notificationIcon, link: '/myaccount/notifications' },
    { label: 'Browse History', icon: historyIcon, link: '/myaccount/history' },
  ];

  if (!isOpen && !showConfirmModal) return null;

  return (
    <>
      <div
        className="user-dropdown-wrapper"
        onMouseEnter={() => clearTimeout(timeoutRef.current)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="user-dropdown-menu">
          {menuItems.map((item, idx) => (
            <a key={idx} href={item.link} className="dropdown-item">
              <img src={item.icon} alt={item.label} className="dropdown-icon" />
              {item.label}
            </a>
          ))}

          <button
            type="button"
            className="dropdown-item signout-btn"
            onClick={() => setShowConfirmModal(true)}
          >
            <img src={SignOut} alt="Sign Out" className="dropdown-icon" />
            Sign Out
          </button>
        </div>
      </div>

      <SignOutConfirmModal
        isOpen={showConfirmModal}
        onConfirm={handleSignOut}
        onCancel={handleCancel}
      />
    </>
  );
};

export default UserDropdownMenu;