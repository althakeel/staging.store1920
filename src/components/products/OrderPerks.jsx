import React, { useState, useRef, useEffect } from 'react';
import '../../assets/styles/OrderPerks.css';

export default function OrderPerks() {
  const [activeModal, setActiveModal] = useState(null); // null | 'shipping' | 'guarantee' | 'cod'

  const badgeScrollRef = useRef(null);
  const guaranteeBadgeScrollRef = useRef(null);

  const scrollBadges = (direction, ref) => {
    if (!ref.current) return;
    const scrollAmount = 160;
    ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  // Close on ESC key when a modal is open
  useEffect(() => {
    if (!activeModal) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModal]);

  return (
    <div className="order-perks">

      <div className="cod-offer" onClick={() => setActiveModal('cod')} role="button" tabIndex={0} onKeyPress={e => { if (e.key === 'Enter') setActiveModal('cod'); }}>
        ✅ COD fees 30% OFF. Limited-time offer!
      </div>

      <div className="shipping-header">
        <span>🚚 Free shipping for this item</span>
      </div>

      <div className="badge-scroll-wrapper">
        <button
          className="scroll-arrow"
          onClick={() => scrollBadges('left', badgeScrollRef)}
          aria-label="Scroll badges left"
          type="button"
        >
          ❮
        </button>

        <div
          className="badge-scroll-container"
          onClick={() => setActiveModal('shipping')}
          ref={badgeScrollRef}
          role="button"
          tabIndex={0}
          onKeyPress={e => { if (e.key === 'Enter') setActiveModal('shipping'); }}
        >
         <div className="badge">✔ AED20.00 Credit for delay</div>
<div className="badge">✔ 15-day no update refund</div>
<div className="badge">✔ 40-day no delivery refund</div>
<div className="badge">✔ 🚚 Free shipping for this item</div>
<div className="badge">✔ 🚀 Express delivery available</div>
<div className="badge">✔ 📦 Easy order tracking</div>
<div className="badge">✔ 🕒 Same-day dispatch</div>
<div className="badge">✔ 🔄 Free returns on shipping damage</div>

        </div>

        <button
          className="scroll-arrow"
          onClick={() => scrollBadges('right', badgeScrollRef)}
          aria-label="Scroll badges right"
          type="button"
        >
          ❯
        </button>
      </div>

      <div className="delivery-info">Fastest delivery in 2 business days</div>

      <div className="safe-payments">
        🔒 Safe payments • Secure privacy
      </div>

      <div className="order-guarantee">

        <div className="guarantee-header">🔒 Order Guarantee</div>

        <div className="badge-scroll-wrapper">
          <button
            className="scroll-arrow"
            onClick={() => scrollBadges('left', guaranteeBadgeScrollRef)}
            aria-label="Scroll guarantee badges left"
            type="button"
          >
            ❮
          </button>

          <div
            className="badge-scroll-container guarantee"
            ref={guaranteeBadgeScrollRef}
            role="group"
            aria-label="Order guarantee badges"
          >
            {['Free Returns within 30 days',  'Price Adjustment within 30 days', 'Return if Item Damaged','Authenticity Guaranteed', 'Fast Refund Processing', 'Secure Payment',  'Warranty Support'].map((text, i) => (
              <div
                key={i}
                className="badge clickable"
                onClick={() => setActiveModal('guarantee')}
                tabIndex={0}
                role="button"
                onKeyPress={e => { if (e.key === 'Enter') setActiveModal('guarantee'); }}
              >
                ✔ {text}
              </div>
            ))}
          </div>

          <button
            className="scroll-arrow"
            onClick={() => scrollBadges('right', guaranteeBadgeScrollRef)}
            aria-label="Scroll guarantee badges right"
            type="button"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Modal Popups */}
      {activeModal === 'shipping' && (
        <ModalWrapper onClose={() => setActiveModal(null)} titleId="shippingPopupTitle" label="Shipping">
          <h2 id="shippingPopupTitle">Shipping</h2>
          <table>
            <tbody>
              <tr>
                <td className="table-label">Company</td>
                <td>Shipa Delivery, Ajex, Emirates Post, J&T Express</td>
              </tr>
              <tr>
                <td className="table-label">Delivery time</td>
                <td>2–7 business days</td>
              </tr>
              <tr>
                <td className="table-label">Costs</td>
                <td>FREE</td>
              </tr>
              <tr>
                <td className="table-label" style={{ verticalAlign: 'top' }}>Shipping guarantee</td>
             <td>
  ✔ AED20.00 Credit for delivery delays<br />
  ✔ Full refund if product not received within 40 days<br />
  ✔ Free returns within 30 days of purchase<br />
  ✔ 24/7 Customer support via chat and phone<br />
  ✔ Authenticity and quality guaranteed<br />
  ✔ Price protection within 30 days of purchase<br />
  ✔ Secure payment and data privacy assured<br />
  ✔ Warranty claims supported for eligible products
</td>

              </tr>
            </tbody>
          </table>
          <p className="popup-note">
            ⚠️ The above is only for items not shipped from local warehouses. If delivered after 17 Jul, you will get <strong style={{ color: 'orange' }}>AED20.00 credit</strong> within 48 hours.
          </p>
          <hr />
          <h3 className="fastest-delivery">Fastest delivery in 2 business days</h3>
          <div className="delivery-stats">
            <div>≤2 business days <div className="delivery-bar" style={{ width: '40px' }}></div> 7.2%</div>
            <div>3 business days <div className="delivery-bar" style={{ width: '80px' }}></div> 14.9%</div>
            <div>4 business days <div className="delivery-bar" style={{ width: '120px' }}></div> 25.2%</div>
            <div>5 business days <div className="delivery-bar" style={{ width: '150px' }}></div> 31.3%</div>
            <div>6 business days <div className="delivery-bar" style={{ width: '80px' }}></div> 13.0%</div>
            <div>7 business days <div className="delivery-bar" style={{ width: '30px' }}></div> 4.2%</div>
            <div>&gt;7 business days <div className="delivery-bar" style={{ width: '30px' }}></div> 4.2%</div>
          </div>
        </ModalWrapper>
      )}

      {activeModal === 'guarantee' && (
        <ModalWrapper onClose={() => setActiveModal(null)} titleId="guaranteePopupTitle" label="Order guarantee" extraClass="guarantee-popup" closeBtnClass="green">
          <h2 id="guaranteePopupTitle">Order guarantee</h2>
          <table>
            <tbody>
              <tr>
                <td className="number">1</td>
                <td>
                  <strong>Free returns within 90 days of purchase</strong>
                  <p>
                    The first return of one or multiple returnable items for EVERY order is free! This item can be returned within 90 days from the date of purchase.<br />
                    If the returned item is used, damaged, missing parts/accessories, the refund will be reduced to compensate for the lost value of the item.
                  </p>
                  <a href="#" onClick={e => e.preventDefault()}>Learn more</a>
                </td>
              </tr>
              <tr>
                <td className="number">2</td>
                <td>
                  <strong>Return if item damaged</strong>
                  <p>
                    If you receive your package and find that some items are lost or damaged in transit, rest assured that you can easily apply for a full refund for those items.
                  </p>
                </td>
              </tr>
              <tr>
                <td className="number">3</td>
                <td>
                  <strong>Price adjustment within 30 days of payment</strong>
                  <p>
                    Items purchased from Store1920 are eligible for our price adjustment policy. Store1920 will provide the price difference in the currency that the order was paid in if the selling price of the item purchased was reduced within 30 days of payment in the same country or region. The shipment of your order will not be affected by applying for a price adjustment before you receive your item(s). You can request a price adjustment refund by selecting the relevant order in 'Your Orders' and clicking on the 'Price adjustment' button.<br /><br />
                    Items that are promotional or no longer available may not be eligible for our price adjustment policy. Fees, including but not limited to shipping fees, will be excluded for any price adjustment calculation. Store1920 reserves the right to the final interpretation of our price adjustment policy, the right to modify the terms of this policy at any time, and the right to deny any price adjustment at our sole discretion.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </ModalWrapper>
      )}

      {activeModal === 'cod' && (
        <ModalWrapper onClose={() => setActiveModal(null)} titleId="codPopupTitle" label="COD fees 30% OFF" extraClass="cod-popup">
          <h2 id="codPopupTitle">COD fees 30% OFF</h2>
          <p>COD fees 30% OFF when shipping from Store1920. Limited-time offer!</p>
          <p>
            Cash on Delivery is a payment option supported by merchandise partners for customers in Saudi Arabia, Kuwait, United Arab Emirates, Qatar, Oman, Bahrain and Jordan, where customers can pay in cash upon delivery of the parcel.
          </p>
          <button className="ok-button" onClick={() => setActiveModal(null)}>OK</button>
        </ModalWrapper>
      )}

    </div>
  );
}

function ModalWrapper({ onClose, titleId, label, children, extraClass = '', closeBtnClass = '' }) {
  return (
    <div
      className={`popup-overlay ${extraClass}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-label={label}
      tabIndex={-1}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div
        className={`popup-content ${extraClass}`}
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '20px',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        <button
          className={`popup-close ${closeBtnClass}`}
          onClick={onClose}
          aria-label={`Close ${label} popup`}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
