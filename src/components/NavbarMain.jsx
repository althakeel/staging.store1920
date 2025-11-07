// NavbarWithMegaMenu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import chroma from 'chroma-js';

import SearchBar from './sub/SearchBar';
import SignInModal from './sub/SignInModal';
import MobileMenu from './sub/MobileMenu';
import UserDropdownMenu from './UserDropdownMenu';
import SupportDropdownMenu from './sub/SupportDropdownMenu';
import CoinWidget from './CoinWidget';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext'; 
import { useAuth } from '../contexts/AuthContext';
import LogoMain from '../assets/images/Logo/3.webp';

import Dirham from '../assets/images/language/aed (1).png';
import Dollor from '../assets/images/language/dollor.png';
import aeFlag from '../assets/images/language/aed (3).png';
import truck from '../assets/images/common/truck.png'

import '../assets/styles/Navbar.css';

// Icons
import Newicon from '../assets/images/webicons/Header/White/Asset 34@6x.png';
import Star from '../assets/images/webicons/Common/Asset 117@6x.png';
import SupportIcon from '../assets/images/webicons/Header/White/Asset 32@6x.png';
import CartIcon from '../assets/images/webicons/Header/White/Asset 30@6x.png';
import UserIcon from '../assets/images/webicons/Header/White/Asset 21@6x.png';
import TopSellicon from '../assets/images/webicons/Header/White/Asset 24@6x.png';

// MegaMenu Component
import MegaMenu from '../components/sub/megamenu';

const NavbarWithMegaMenu = ({ cartIconRef, openCart }) => {
  const { currentTheme } = useTheme(); 
  const { user, login, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('AED');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const { isCartOpen, cartItems } = useCart();
  const navigate = useNavigate();
const [currentMessage, setCurrentMessage] = useState('🚀 Fast Delivery');


  const timeoutRef = useRef(null);
  const supportTimeoutRef = useRef(null);
  const userTimeoutRef = useRef(null);
  const langTimeoutRef = useRef(null);

    const fastDeliveryRef = useRef(null);
  const buttonRef = useRef(null);


  const totalQuantity = cartItems?.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0) || 0;

  const truncateName = (name, maxLength = 10) => {
    if (!name) return '';
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
  };
const messages = [
  '🚀 Fast Delivery',
  '📦 Within 2 days',

];

  const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };



  
  useEffect(() => {
    const showFastDelivery = () => {
      if (fastDeliveryRef.current) {
        fastDeliveryRef.current.style.opacity = '1';
        fastDeliveryRef.current.style.transform = 'rotate(0deg) scale(1.05)';
        setTimeout(() => {
          if (fastDeliveryRef.current) {
            fastDeliveryRef.current.style.opacity = '0';
            fastDeliveryRef.current.style.transform = 'rotate(-2deg) scale(1)';
          }
        }, 1500);
      }
    };

    const interval = setInterval(showFastDelivery, 6000);
    return () => clearInterval(interval);
  }, []);



    useEffect(() => {
    if (buttonRef.current && !buttonRef.current.dataset.gradientCycle) {
      buttonRef.current.dataset.gradientCycle = 'true';
      const gradients = [
        'linear-gradient(90deg, #ff7a00, #ff4800)',
        'linear-gradient(90deg, #ff5e00, #ff0080)',
        'linear-gradient(90deg, #ff0080, #8000ff)',
        'linear-gradient(90deg, #00c6ff, #0072ff)',
        'linear-gradient(90deg, #00b09b, #96c93d)',
      ];
      let i = 0;
      setInterval(() => {
        i = (i + 1) % gradients.length;
        buttonRef.current.style.background = gradients[i];
      }, 5000);
    }
  }, []);

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => {
        const currentIndex = messages.indexOf(prev);
        return messages[(currentIndex + 1) % messages.length];
      });
    }, 3000); // change text every 3 seconds

    return () => clearInterval(interval);
  }, []);



  // Auto logout after 30 minutes
  useEffect(() => {
    const MS_PER_MINUTE = 60 * 1000;
    const handleBeforeUnload = () => {
      const now = new Date().getTime();
      localStorage.setItem('lastClosed', now);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    const lastClosed = localStorage.getItem('lastClosed');
    if (lastClosed) {
      const now = new Date().getTime();
      if (now - Number(lastClosed) >= 30 * MS_PER_MINUTE) {
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        console.log('User auto-signed out after 30 minutes of inactivity.');
      }
    }
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Update mobile state on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovering(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHovering(false), 200);
  };
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  // ===================== Updated handleLogin =====================
  const handleLogin = (userData) => {
    const mappedUser = {
      id: userData.id || userData.user?.id || userData.uid,
      name:
        userData.name ||
        userData.user?.name ||
        userData.displayName ||
        (userData.email ? userData.email.split('@')[0] : 'User'),
      email: userData.email || userData.user?.email || '',
      image: userData.image || userData.user?.photoURL || userData.photoURL || null,
      token: userData.token || null,
    };

    login(mappedUser);
    setSignInOpen(false);
  };

  const handleSignOut = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const backgroundColor = currentTheme?.navbarBg || '#CCA000';
  const sitelogo = currentTheme?.logo || LogoMain;
  const isDark = chroma(backgroundColor).luminance() < 0.5;
  const textColor = isDark ? '#fff' : '#fff';

  return (
    <>
      <nav
        className="navbar"
        style={{
          width: isMobile ? '100%' : isCartOpen ? 'calc(100% - 250px)' : '100%',
          transition: 'width 0.3s ease',
          backgroundColor,
          color: textColor,
        }}
      >
        <div className="navbar-inner">
          <div className="nav-left">
            <img
              src={sitelogo}
              alt="Store1920"
              className="logo"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                closeMobileMenu();
                navigate('/');
              }}
            />
          </div>

          <div className="nav-center-mobile"><SearchBar /></div>

          <div
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </div>

          <div className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="nav-left-links">
              <div className="nav-icon-with-text star-rating" onClick={() => navigate('/top-selling-item')}>
                <img src={TopSellicon} alt="Top Selling" className="icon-star" />
                <span>Top Selling Items</span>
              </div>
              <div className="nav-icon-with-text" onClick={() => navigate('/new')}>
                <img src={Newicon} alt="New" className="icon-small" />
                <span>New</span>
              </div>
   
   
<div style={{ position: 'relative', display: 'inline-block', fontFamily: 'sans-serif' }}>
  {/* Animated Floating Badge */}
  <div
    style={{
      position: 'absolute',
      top: '-30px', // move up a bit for arrow
      left: '0px',
      background: '#ff9900e5',
      color: '#fff',
      padding: '10px 15px 15px',
      borderRadius: '5px',
      fontSize: '11px',
      fontWeight: '600',
      boxShadow: '0 2px 8px rgba(255,71,87,0.4)',
      zIndex: 2,
      overflow: 'visible', // allow arrow to show
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <span key={currentMessage} className="animatedBadgeText">
      {currentMessage}
    </span>

    {/* Arrow pointing down */}
    <div
      style={{
        position: 'absolute',
        bottom: '-5px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0',
        height: '0',
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '6px solid #ff4757',
      }}
    />

    <style>
      {`
        .animatedBadgeText {
          display: inline-block;
          animation: slideInTop 0.6s ease forwards;
        }

        @keyframes slideInTop {
          0% { transform: translateY(-100%); opacity: 0; }
          60% { transform: translateY(10%); opacity: 1; }
          80% { transform: translateY(-3%); }
          100% { transform: translateY(0); }
        }
      `}
    </style>
  </div>

  {/* Main Button */}
  <div
    onClick={() => navigate('/fast-delivery')}
    style={{
      background: 'transparent',
      color: '#ffffff',
      padding: '8px 10px',
      border: '1px solid #ffffff2c',
      borderRadius: '30px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontWeight: '700',
      fontSize: '14px',
      letterSpacing: '0.5px',
      overflow: 'hidden',
      position: 'relative',
      isolation: 'isolate',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 0 12px rgba(255,255,255,0.5)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {/* Shine effect */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '-80%',
        width: '50%',
        height: '100%',
        background: 'linear-gradient(120deg, rgba(255,255,255,0.5), rgba(255,255,255,0))',
        transform: 'skewX(-25deg)',
        animation: 'shine 2s infinite',
        zIndex: 0,
      }}
    />
    {/* Truck Image with jerk animation */}

    {/* Truck */}
<img
  src={truck}
  alt="ShipXpress"
  style={{
    width: "26px",
    height: "26px",
    zIndex: 2,
    position: "relative",
    animation: "truckOneSideSlow 10s linear infinite",
  }}
/>

<div
  style={{
    position: "absolute",
    left: "0px",
    width: "14px",
    height: "14px",
    background: "radial-gradient(circle, rgba(220,220,220,0.8) 0%, rgba(220,220,220,0) 70%)",
    borderRadius: "50%",
    opacity: 0,
    filter: "blur(3px)",
    animation: "fogPuff 10s ease-in-out infinite",
    zIndex: 0,
  }}
></div>


  <span
    style={{
      color: "#fff",
      fontWeight: "700",
      fontSize: "14px",
      zIndex: 1,
      position: "relative",
    }}
  >
    ShipXpress
  </span>

<style>
{`
  @keyframes truckOneSideSlow {
    0%   { transform: translateX(0); opacity:1; }          /* near text */
    20%  { transform: translateX(45px); opacity:1; }       /* drive right fast */
    30%  { transform: translateX(80px); opacity:0; }       /* fade out offscreen */
    60%  { transform: translateX(-80px); opacity:0; }      /* off left */
    70%  { transform: translateX(-20px); opacity:1; }      /* start slow left approach */
    80%  { transform: translateX(0); opacity:1; }          /* stop near text */
    100% { transform: translateX(0); opacity:1; }
  }

  @keyframes fogPuff {
    0%, 70% { opacity:0; transform: scale(0.8); }
    75%     { opacity:0.7; transform: scale(1.3); }  /* visible puff */
    85%     { opacity:0.3; transform: scale(1.8); }  /* fade out */
    100%    { opacity:0; transform: scale(0.8); }
  }
`}
</style>


  </div>
</div>




              <div className="nav-icon-with-text star-rating" onClick={() => navigate('/rated')}>
                <img src={Star} alt="5 Star rated" className="icon-star" />
                <span>5-Star Rated</span>
              </div>

              <div
                className="categories-dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>Categories&nbsp;▾</span>
              </div>
              {hovering && (
                <div
                  className="mega-dropdown-card"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <MegaMenu categories={categories} onClose={() => setHovering(false)} />
                </div>
              )}
            </div>

            <div className="nav-center"><SearchBar /></div>

            <div className="nav-right">
              {user ? (
                <div
                  className="account logged-in"
                  title={`Hi, ${user?.name || 'User'}`}
                  onMouseEnter={() => {
                    if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
                    setUserDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    userTimeoutRef.current = setTimeout(() => setUserDropdownOpen(false), 200);
                  }}
                  style={{ position: 'relative' }}
                >
                  <div className="avatar">
                    {user?.image ? (
                      <img src={user.image} alt={user.name} />
                    ) : (
                      <div className="avatar-fallback">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  <div className="user-name">
                    Hi, {user?.name ? capitalizeFirst(truncateName(user.name)) : 'User'}{' '}
                    <CoinWidget userId={user?.id ? Number(user.id) : 0} />
                  </div>

                  <UserDropdownMenu
                    user={user}
                    isOpen={userDropdownOpen}
                    onSignOut={handleSignOut}
                    onClose={() => setUserDropdownOpen(false)}
                    setUserDropdownOpen={setUserDropdownOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                  />
                </div>
              ) : (
                <div className="account guest-account" onClick={() => setSignInOpen(true)}>
                  <img src={UserIcon} alt="Profile Icon" className="icon-small" />
                  <div className="account-text" style={{ color: textColor }}>
                    <span className="account-title">Sign In / Register</span>
                    <span className="small-text">Orders & Account</span>
                  </div>
                </div>
              )}

              {/* Support dropdown */}
              <div
                className="nav-icon-with-text support-link"
                onMouseEnter={() => {
                  if (supportTimeoutRef.current) clearTimeout(supportTimeoutRef.current);
                  setSupportDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  supportTimeoutRef.current = setTimeout(() => setSupportDropdownOpen(false), 200);
                }}
                style={{ position: 'relative', cursor: 'pointer', color: textColor }}
              >
                <img src={SupportIcon} alt="Support Icon" className="icon-small" />
                <span>Support</span>
                <SupportDropdownMenu isOpen={supportDropdownOpen} onClose={() => setSupportDropdownOpen(false)} />
              </div>

              {/* Language & currency */}
              <div
                className="nav-icon-with-text language-dropdown"
                onMouseEnter={() => {
                  if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
                  setLangDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  langTimeoutRef.current = setTimeout(() => setLangDropdownOpen(false), 200);
                }}
                style={{ position: 'relative', cursor: 'pointer', marginRight: '20px', color: textColor }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={aeFlag}
                    alt={language === 'en' ? 'English' : 'العربية'}
                    className="lang-icon"
                    style={{ marginRight: '5px', width: '20px', height: '20px' }}
                  />
                  {language === 'en' ? 'English' : 'العربية'} ▾
                </span>

                {langDropdownOpen && (
                  <div className="lang-dropdown-card">
                    <div className="dropdown-arrow-up" />
                    <div className="dropdown-section">
                      <div className="dropdown-title">Language</div>
                      <label className="radio-item">
                        <input type="radio" checked={language === 'ar'} onChange={() => setLanguage('ar')} />
                        العربية
                      </label>
                      <label className="radio-item">
                        <input type="radio" checked={language === 'en'} onChange={() => setLanguage('en')} />
                        English
                      </label>
                    </div>

                    <hr />

                    <div className="dropdown-section">
                      <div className="currency-item" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>Currency:</span>
                        <img src={currency === 'AED' ? Dirham : Dollor} alt={currency} style={{ width: '14px', height: '12px' }} />
                        <span>{currency}</span>
                      </div>
                    </div>

                    <hr />

                    <div className="dropdown-footer">
                      <img src={aeFlag} alt="UAE" className="footer-flag" />
                      <span style={{ maxWidth: "250px", display: "inline-block", whiteSpace: "normal", lineHeight: "1.4" }}>
                        You are shopping in United Arab Emirates.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart icon */}
              <div
                className="nav-icon-only"
                title="Cart"
                onClick={() => navigate('/cart')}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <img src={CartIcon} alt="Cart" className="icon-cart" />
                {totalQuantity > 0 && <div className="cart-badge">{totalQuantity}</div>}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
        categories={categories}
        user={user}
        userDropdownOpen={userDropdownOpen}
        setUserDropdownOpen={setUserDropdownOpen}
        setSignInOpen={setSignInOpen}
        handleSignOut={handleSignOut}
        closeUserDropdown={() => setUserDropdownOpen(false)}
      />

      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default NavbarWithMegaMenu;