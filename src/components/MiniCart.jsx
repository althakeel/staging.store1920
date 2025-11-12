import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import SignInModal from './sub/SignInModal';
import '../assets/styles/MiniCart.css';
import Banner1 from '../assets/images/banner-blue.webp';
import Banner2 from '../assets/images/banner-green.webp';
import Banner3 from '../assets/images/banner-orange.webp';
import Banner4 from '../assets/images/banner-red.webp';
import CartIcon from '../assets/images/cart.png';

const FREE_SHIPPING_THRESHOLD = 100;

const banners = [
  Banner1,
  Banner2,
  Banner3,
  Banner4,
];

const MiniCart = ({ navbarColor }) => {
  const { cartItems, updateQuantity, removeFromCart, setIsCartOpen, isCartOpen } = useCart();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showStars, setShowStars] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Banner rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((i) => (i + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-close cart when empty
  useEffect(() => {
    if (cartItems.length === 0) {
      setIsCartOpen(false);
    }
  }, [cartItems, setIsCartOpen]);

  // Show stars briefly if qualified for free shipping
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const qualifiesFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const progressPercent = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);

  useEffect(() => {
    if (qualifiesFreeShipping) {
      setShowStars(true);
      const timer = setTimeout(() => setShowStars(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [qualifiesFreeShipping]);

  // Window resize listener to avoid showing MiniCart on mobile
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
  console.log('Cart items:', cartItems);
}, [cartItems]);

// const onCheckoutClick = () => {
//   const storedUserId = localStorage.getItem('userId');

//   if (!storedUserId) {
//     setSignInOpen(true);
//     return;
//   }
//   setIsCartOpen(false);
//   navigate('/checkout');
// };
// hide the sign in minicart


const onCheckoutClick = () => {
  setIsCartOpen(false);
  navigate('/checkout');
};


useEffect(() => {
  console.log('Cart items:', cartItems);
}, [cartItems]);
  // ✅ Only render if open, cart has items, and screen width is >= 768px
  if (!isCartOpen || cartItems.length === 0 || windowWidth < 768) return null;

  return (
    <>
      <div
        style={{
          width: 250,
          height: '100vh',
          position: 'fixed',
          top: 0,
          right: 0,
          background: '#fff',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
        }}
      >
        {/* Top Section */}
        <div
          style={{
            flexShrink: 0,
            padding: 12,
            background: navbarColor,
            borderBottom: '1px solid #eee',
            position: 'relative',
          }}
        >
          <div style={{ position: 'relative', marginBottom: 10 }}>
            <img
              src={banners[currentBannerIndex]}
              alt="Banner"
              style={{ width: '100%', borderRadius: 6 }}
            />
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                pointerEvents: 'none',
                zIndex: 3,
              }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={CartIcon}
                  alt="Cart Icon"
                  style={{
                    width: 24,
                    height: 24,
                    // filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))',
                  }}
                />
                {cartItems.length > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -0,
                      right: 5,
                      backgroundColor: 'transparent',
                      color: 'white',
                      borderRadius: '50%',
                      width: 10,
                      height: 10,
                      fontSize: 12,
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    {cartItems.length}
                  </div>
                )}
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 18,
                  color: '#fff',
                  // textShadow: '0 0 5px rgba(0,0,0,.6)',
                  fontWeight: 'bold',
                }}
              >
                Cart
              </h2>
            </div>
          </div>

          <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 6 }}>
            Total: {totalPrice.toFixed(2)} AED
          </div>

          <div
            style={{
              background: '#4caf50',
              color: '#fff',
              fontSize: 12,
              padding: '4px 10px',
              borderRadius: 12,
              display: 'inline-block',
              marginBottom: 6,
            }}
          >
            Free shipping over 100 AED
          </div>

          <div
            style={{
              width: '100%',
              height: 10,
              background: '#eee',
              borderRadius: 5,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: qualifiesFreeShipping ? '#4caf50' : '#2196f3',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          <div
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: qualifiesFreeShipping ? '#4caf50' : '#555',
              marginTop: 6,
            }}
          >
            {qualifiesFreeShipping
              ? 'You are eligible for free shipping!'
              : `Add ${(FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(2)} AED more`}
          </div>

          <button
            onClick={onCheckoutClick}
            style={{
              marginTop: 10,
              width: '100%',
              padding: 8,
              backgroundColor: '#2196f3',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Checkout
          </button>

          <button
            onClick={() => navigate('/cart')}
            style={{
              marginTop: 8,
              width: '100%',
              padding: 8,
              backgroundColor: '#f57c00',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Go to Cart
          </button>
        </div>

        {showStars && (
          <div className="celebration-overlay">
            <img
              src="https://db.store1920.com/wp-content/uploads/2025/07/Pop-up-video.gif"
              alt="Celebration"
              className="celebration-gif"
            />
          </div>
        )}

        {/* Product List */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '10px 12px' }}>
          {cartItems.map((item) => (
            <div className="mini-cart-product" key={item.id}>
              <img src={item.images?.[0]?.src || item.image || ''} alt="" />
              <div className="mini-cart-product-details">
                <div className="price">{item.price} AED</div>
                <select
                  className="quantity-select"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                >
                  {Array.from(
                    { length: Math.min(item.stock_quantity ?? 99, 99) },
                    (_, i) => i + 1
                  ).map((qty) => (
                    <option key={qty} value={qty}>
                      Qty: {qty}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mini-cart-remove-btn"
                aria-label="Remove item"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onLogin={() => setSignInOpen(false)}
      />
    </>
  );
};

export default MiniCart;
