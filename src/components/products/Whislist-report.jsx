import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInModal from '../sub/SignInModal';

const wishlistIconBefore = 'https://db.store1920.com/wp-content/uploads/2025/07/WHISHLIST-1.png';
const wishlistIconAfter = 'https://db.store1920.com/wp-content/uploads/2025/07/WHISHLIST-2-1.png';

export default function ProductPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const navigate = useNavigate();

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    closeLoginModal();
  };

  const handleAddToWishlist = () => {
    alert('Product added to wishlist!');
    setAddedToWishlist(true);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const ProductActions = ({
    onAddToWishlist,
    wishlistPageUrl = '/wishlist',
    isLoggedIn,
    onOpenLoginPopup,
    added,
  }) => {
    const navigate = useNavigate();

    const handleWishlistClick = () => {
      if (!isLoggedIn) {
        onOpenLoginPopup?.();
        return;
      }
      if (!added) {
        onAddToWishlist?.();
      } else {
        navigate(wishlistPageUrl);
      }
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'right', gap: '6px', marginTop: '24px', position: 'relative' }}>
        <div
          style={{ position: 'relative', cursor: 'pointer', width: '20px', height: '40px', maxWidth: '20px' }}
          onClick={handleWishlistClick}
          onMouseEnter={() => added && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <img
            src={added ? wishlistIconAfter : wishlistIconBefore}
            alt={added ? 'Go to Wishlist' : 'Add to Wishlist'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transition: 'opacity 0.3s',
              maxWidth: '20px',
            }}
          />
          {showTooltip && added && (
            <div style={{
              position: 'absolute',
              top: '-35px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '6px 0px',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '6px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              opacity: 0.8,
              zIndex: 1000,
              userSelect: 'none',
            }}>
              Product is added to wishlist
            </div>
          )}
        </div>

        {/* Report button with underline on hover */}
        <button
          onClick={() => {
            if (!isLoggedIn) {
              onOpenLoginPopup?.();
              return;
            }
            alert('Product reported!');
          }}
          style={{
            backgroundColor: '#fff',
            color: '#444',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            fontFamily: 'Montserrat, sans-serif',
            transition: 'all 0.3s ease',
            minWidth: '150px',
            padding: '5px 14px',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffffff';
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          Report This Product 
        </button>
      </div>
    );
  };

  return (
    <>
      <ProductActions
        isLoggedIn={isLoggedIn}
        onOpenLoginPopup={openLoginModal}
        onAddToWishlist={handleAddToWishlist}
        wishlistPageUrl="/wishlist"
        added={addedToWishlist}
      />

      {showLoginModal && (
        <SignInModal isOpen={showLoginModal} onClose={closeLoginModal} onLogin={handleLogin} />
      )}
    </>
  );
}
