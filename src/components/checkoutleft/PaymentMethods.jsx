import React from 'react';
import '../../assets/styles/checkoutleft/paymentmethods.css';

import circleEmpty from '../../assets/images/tabby/full.webp';
import circleQuarter from '../../assets/images/tabby/quarter.webp';
import circleHalf from '../../assets/images/tabby/half.webp';
import circleFull from '../../assets/images/tabby/half-and-quarter.webp';
import aedIcon from '../../assets/images/Dirham 2.png';

import TabbyIcon from '../../assets/images/Footer icons/3.webp';
import TamaraIcon from '../../assets/images/Footer icons/6.webp';
import CashIcon from '../../assets/images/Footer icons/13.webp';
import CardIcon from '../../assets/images/tabby/creditcard.webp';

import AppleIcon from '../../assets/images/Footer icons/2.webp';
import VisaIcon from '../../assets/images/Footer icons/17.webp';
import MasterIcon from '../../assets/images/Footer icons/16.webp';

// Card payment icons
import ApplePayIcon from '../../assets/images/Footer icons/2.webp';
import TabbyPayIcon from '../../assets/images/Footer icons/3.webp';
import TamaraPayIcon from '../../assets/images/Footer icons/6.webp';
import AmexIcon from '../../assets/images/Footer icons/11.webp';
import GooglePayIcon from '../../assets/images/Footer icons/12.webp';
import CashPayIcon from '../../assets/images/Footer icons/13.webp';
import MasterCardIcon from '../../assets/images/Footer icons/16.webp';
import VisaCardIcon from '../../assets/images/Footer icons/17.webp';
import PayPalIcon from '../../assets/images/Footer icons/18.webp';

// Safely import staticProducts with fallback
let staticProducts = [];
try {
  const staticProductsModule = require('../../data/staticProducts');
  staticProducts = staticProductsModule.default || staticProductsModule || [];
} catch (error) {
  console.warn('Could not load static products data:', error);
  staticProducts = [];
}

const PaymentMethods = ({ selectedMethod, onMethodSelect, subtotal, cartItems = [] }) => {
  const [showCodPopup, setShowCodPopup] = React.useState(false);

  // Get all static product IDs from staticProducts.js with error handling
  let staticProductIds = [];
  
  try {
    staticProductIds = staticProducts.flatMap(product => {
      const ids = [product.id];
      // Add bundle IDs from each product's bundles array
      if (product.bundles && Array.isArray(product.bundles)) {
        product.bundles.forEach(bundle => {
          if (bundle.id) {
            ids.push(bundle.id);
          }
        });
      }
      return ids;
    });
  } catch (error) {
    console.warn('Error loading static products for COD logic:', error);
    // Fallback to empty array if there's an error
    staticProductIds = [];
  }

  // Check if cart contains only static products
  const hasOnlyStaticProducts = cartItems.length > 0 && staticProductIds.length > 0 && cartItems.every(item => 
    staticProductIds.includes(item.id)
  );

  // Check if cart has any non-static products
  const hasNonStaticProducts = staticProductIds.length > 0 && cartItems.some(item => 
    !staticProductIds.includes(item.id)
  );

  // Calculate dynamic amounts for payment methods
  const amount = Number(subtotal) || 0;
  const tabbyInstallment = (amount / 4).toFixed(2);
  
  // Payment options - COD only shows for static products only
  const paymentOptions = [
    ...(hasOnlyStaticProducts && !hasNonStaticProducts && staticProductIds.length > 0 ? [
      { id: 'cod', title: 'Cash On Delivery', description: 'Pay with cash on delivery', img: CashIcon }
    ] : []),
    { id: 'card', title: 'Credit/Debit Card', description: 'Pay securely with card', img: CardIcon },
    { 
      id: 'tabby', 
      title: 'Tabby: Split into 4 Payments', 
      description: `Pay AED${tabbyInstallment} today and the rest in 3 interest-free payments`,
      img: TabbyIcon 
    },
    { 
      id: 'tamara', 
      title: 'Tamara: Split in up to 4 payments', 
      description: `Pay AED${tabbyInstallment} today and the rest in 3 interest-free payments`,
      img: TamaraIcon 
    },
  ];

  // Auto-switch to card if COD was selected but is no longer available
  React.useEffect(() => {
    const isCodAvailable = hasOnlyStaticProducts && !hasNonStaticProducts && staticProductIds.length > 0;
    if (selectedMethod === 'cod' && !isCodAvailable) {
      onMethodSelect('card', 'Credit/Debit Card', CardIcon);
    }
  }, [cartItems, selectedMethod, onMethodSelect, hasOnlyStaticProducts, hasNonStaticProducts, staticProductIds.length]);
    
  const renderExtraInfo = (method) => {
    const amount = Number(subtotal) || 0;
    const today = new Date();
    const formatDate = (date) =>
      date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

    if (method === 'tabby') {
      const installment = (amount / 4).toFixed(2);
      const dates = [0, 30, 60, 90].map((d) => {
        const dt = new Date(today);
        dt.setDate(today.getDate() + d);
        return formatDate(dt);
      });

      const progressImages = [circleQuarter, circleHalf, circleFull, circleEmpty];

      return (
        <div className="pm-extra tabby-extra">
          <p style={{ color: 'grey' }}>Use Any cards</p>
          <p className="tabby-note">Pay in 4 easy installments without any extra fees</p>
          <div className="tabby-progress">
            {dates.map((date, idx) => (
              <div key={idx} className="tabby-step-wrapper">
                {idx !== 0 && <div className="tabby-line"></div>}
                <div className="tabby-step">
                  <img src={progressImages[idx]} alt={`Step ${idx + 1}`} className="tabby-circle" />
                  <div className="tabby-amount">
                    <img src={aedIcon} alt="AED" className="aed-icon" /> {installment}
                  </div>
                  <div className="tabby-date">{idx === 0 ? 'Today' : date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (method === 'tamara') {
      const dueDate = new Date(today);
      dueDate.setDate(today.getDate() + 14);
      return (
        <div className="pm-extra tamara-extra">
          <p style={{ color: 'grey' }}>Use Any cards</p>
          <p>Pay later in 14 days:</p>
          <ul>
            <li>AED {amount.toFixed(2)} — {formatDate(dueDate)}</li>
          </ul>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="pm-wrapper">
      <h3>Payment methods</h3>
      
      {/* Show message when COD is not available */}
      {cartItems.length > 0 && hasNonStaticProducts && staticProductIds.length > 0 && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          padding: '12px',
          marginBottom: '16px',
          fontSize: '14px',
          color: '#856404'
        }}>
          ℹ️ Cash on Delivery is only available for selected products. Your cart contains items that require online payment.
        </div>
      )} 
      
      <div className="payment-methods-list">
        {/* Credit/Debit Card */}
        <div className="payment-method-item">
          <input 
            type="radio" 
            id="card" 
            name="payment-method"
            checked={selectedMethod === 'card'}
            onChange={() => onMethodSelect('card', 'Credit/Debit Card', CardIcon)}
          />
          <label htmlFor="card" className="payment-method-label">
            <div className="payment-method-content">
              <div className="card-payment-header">
                <span className="card-text">Card</span>
                <div className="card-icons-group">
                  {/* <img src='http://localhost:3000/static/media/19.596d7738d41ca6630085.webp' alt="Visa" className="card-icon" /> */}
                  <img src={MasterCardIcon} alt="Mastercard" className="card-icon" />
                  <img src={AmexIcon} alt="American Express" className="card-icon" />
                   {/* <img src='http://localhost:3000/static/media/20.c033ec0799cf09bb276d.webp' alt="American Express" className="card-icon" /> */}
                  <img src="https://aimg.kwcdn.com/upload_aimg/temu/ebeb26a5-1ac2-4101-862e-efdbc11544f3.png.slim.png" alt="Discover" className="card-icon" />
                  <img src={ApplePayIcon} alt="Diners Club" className="card-icon" />
                  <img src={GooglePayIcon} alt="JCB" className="card-icon" />
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Tabby */}
        {/* <div className="payment-method-item">
          <input 
            type="radio" 
            id="tabby" 
            name="payment-method"
            checked={selectedMethod === 'tabby'}
            onChange={() => onMethodSelect('tabby', 'Tabby', TabbyIcon)}
          />
          <label htmlFor="tabby" className="payment-method-label">
            <div className="payment-method-content">
              <div className="payment-header-row">
                <img src={TabbyIcon} alt="Tabby" className="payment-method-logo" />
                <div className="payment-text-content">
                  <div className="payment-title-row">
                    <span className="payment-title">Tabby: Split into 4 Payments</span>
                    <span className="info-icon">ℹ️</span>
                  </div>
                  <span className="payment-description">Pay AED{tabbyInstallment} today and the rest in 3 interest-free payments</span>
                </div>
              </div>
              <div className="payment-schedule-container">
                <div className="schedule-item">
                  <div className="amount">AED{tabbyInstallment}</div>
                  <div className="period">Today</div>
                  <div className="progress-bar active"></div>
                </div>
                <div className="schedule-item">
                  <div className="amount">AED{tabbyInstallment}</div>
                  <div className="period">In 1 month</div>
                  <div className="progress-bar"></div>
                </div>
                <div className="schedule-item">
                  <div className="amount">AED{tabbyInstallment}</div>
                  <div className="period">In 2 months</div>
                  <div className="progress-bar"></div>
                </div>
                <div className="schedule-item">
                  <div className="amount">AED{tabbyInstallment}</div>
                  <div className="period">In 3 months</div>
                  <div className="progress-bar"></div>
                </div>
              </div>
            </div>
          </label>
        </div> */}

        {/* Tamara */}
        {/* <div className="payment-method-item">
          <input 
            type="radio" 
            id="tamara" 
            name="payment-method"
            checked={selectedMethod === 'tamara'}
            onChange={() => onMethodSelect('tamara', 'Tamara', TamaraIcon)}
          />
          <label htmlFor="tamara" className="payment-method-label">
            <div className="payment-method-content">
              <div className="payment-header-row">
                <img src={TamaraIcon} alt="Tamara" className="payment-method-logo" />
                <div className="payment-text-content">
                  <div className="payment-title-row">
                    <span className="payment-title">Tamara: Split in up to 4 payments</span>
                    <span className="info-icon">ℹ️</span>
                  </div>
                  <span className="payment-description">Pay AED{tabbyInstallment} today and the rest in 3 interest-free payments</span>
                </div>
              </div>
              <div className="payment-schedule-container">
                <div className="schedule-item">
                  <div className="amount">AED{tabbyInstallment}</div>
                  <div className="period">Today</div>
                  <div className="progress-bar active tamara"></div>
                </div>
                <div className="schedule-item">
                  <div className="amount">AED{tabbyInstallment}</div>
                  <div className="period">In 1 month</div>
                  <div className="progress-bar tamara"></div>
                </div>
                <div className="schedule-item">
                  <div className="amount">AED{tabbyInstallment}</div>
                  <div className="period">In 2 months</div>
                  <div className="progress-bar tamara"></div>
                </div>
                <div className="schedule-item">
                  <div className="amount">AED{tabbyInstallment}</div>
                  <div className="period">In 3 months</div>
                  <div className="progress-bar tamara"></div>
                </div>
              </div>
            </div>
          </label>
        </div> */}

        {/* Cash on Delivery */}
        {hasOnlyStaticProducts && !hasNonStaticProducts && staticProductIds.length > 0 && (
          <div className="payment-method-item">
            <input 
              type="radio" 
              id="cod" 
              name="payment-method"
              checked={selectedMethod === 'cod'}
              onChange={() => onMethodSelect('cod', 'Cash on Delivery', CashIcon)}
            />
            <label htmlFor="cod" className="payment-method-label">
              <img src={CashIcon} alt="Cash on Delivery" className="payment-icon" />
              <span className="cod-text-container">
                Cash on Delivery
                <div className="cod-info-wrapper">
                  <span 
                    className="cod-info-icon"
                    onMouseEnter={() => setShowCodPopup(true)}
                    onMouseLeave={() => setShowCodPopup(false)}
                    onClick={() => setShowCodPopup(!showCodPopup)}
                  >
                    ?
                  </span>
                  {showCodPopup && (
                    <div className="cod-popup">
                      <div className="cod-popup-content">
                        <h4>How to use Cash on Delivery (COD)?</h4>
                        <ol>
                          <li>
                            <strong>Place order using Cash on Delivery</strong>
                            <p>You will receive an order confirmation SMS and email.</p>
                          </li>
                          <li>
                            <strong>Prepare the exact cash amount</strong>
                            <p>Delivery will be between 8am - 11pm within 1-2 working days.</p>
                          </li>
                          <li>
                            <strong>Pay the delivery agent</strong>
                            <p>Please pay the cash amount to our delivery agent.</p>
                          </li>
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
