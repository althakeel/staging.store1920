import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHome, FaStore, FaTh, FaUser } from 'react-icons/fa';
import SignInModal from './sub/SignInModal';
import '../assets/styles/Mobile/MobileBottomNav.css';

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [newBtnColor, setNewBtnColor] = useState('linear-gradient(45deg, #ff5500, #ff3c00)');

  const isLoggedIn = user && user.id && user.token;

  const getUserImage = () => {
    if (!isLoggedIn) return null;
    if (user.name?.toLowerCase() === 'rohith') {
      return 'https://example.com/rohith-profile.png';
    }
    return user.image || null;
  };

  const colors = [
    'linear-gradient(45deg, #ff5500, #ff3c00)',
    'linear-gradient(45deg, #00aaff, #0044ff)',
    'linear-gradient(45deg, #00ff88, #00cc44)',
    'linear-gradient(45deg, #ff00cc, #cc00aa)'
  ];

  // Cycle "New" button color every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setNewBtnColor(prev => {
        const currentIndex = colors.indexOf(prev);
        return colors[(currentIndex + 1) % colors.length];
      });
    }, 300000); // 5 min
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoggedIn) setShowSignIn(false);
  }, [isLoggedIn]);

  const menuItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/allproducts', label: 'Shop', icon: <FaStore /> },
    { path: '/new', label: 'New', icon: null, isCenter: true, onClick: () => navigate('/new') },
    { path: '/category', label: 'Categories', icon: <FaTh /> },
    {
      path: isLoggedIn ? '/myaccount' : '#',
      label: isLoggedIn ? 'Account' : 'Sign In',
      icon: isLoggedIn ? (getUserImage() ? <img src={getUserImage()} alt="Profile" className="nav-profile-pic" /> : <FaUser />) : <FaUser />,
      onClick: () => {
        if (isLoggedIn) navigate('/myaccount');
        else setShowSignIn(true);
      }
    }
  ];

  return (
    <>
      <nav className="mobile-bottom-nav slide-up">
        {menuItems.map(item => {
          const isCenter = item.isCenter;
          return (
            <div
              key={item.label}
              className={`nav-item ${isCenter ? 'nav-center-btn' : ''} ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}
              style={isCenter ? { background: newBtnColor } : {}}
            >
              <div className="icon-wrapper">{item.icon}</div>
              <span className="label">{item.label}</span>
            </div>
          );
        })}
      </nav>

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onLogin={userData => {
          login(userData);
          setShowSignIn(false);
        }}
      />
    </>
  );
}
