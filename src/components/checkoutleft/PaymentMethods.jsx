import React, { useEffect } from 'react';
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

// Tabby credentials (provided by user)
const TABBY_PUBLIC_KEY = 'pk_test_019a4e3b-c868-29ff-1078-04aec08847bf';
const TABBY_MERCHANT_CODE = 'Store1920';


const PaymentMethods = ({ selectedMethod, onMethodSelect, subtotal, cartItems = [] }) => {
  const [showCodPopup, setShowCodPopup] = React.useState(false);

  // Set Tabby as default if nothing is selected and Tabby is available
  React.useEffect(() => {
    // Only select Tabby by default if subtotal > 0 and nothing is selected
    if (!selectedMethod && subtotal > 0) {
      onMethodSelect('tabby', 'Tabby', require('../../assets/images/Footer icons/3.webp'));
    }
    // eslint-disable-next-line
  }, [selectedMethod, subtotal, onMethodSelect]);

  // Get all static product IDs from staticProducts.js with error handling
  let staticProductIds = [];
  try {
    staticProductIds = staticProducts.flatMap(product => {
      const ids = [product.id];
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
    staticProductIds = [];
  }

  const hasOnlyStaticProducts = cartItems.length > 0 && staticProductIds.length > 0 && cartItems.every(item => staticProductIds.includes(item.id));
  const hasNonStaticProducts = staticProductIds.length > 0 && cartItems.some(item => !staticProductIds.includes(item.id));
  const amount = Number(subtotal) || 0;
  const tabbyInstallment = (amount / 4).toFixed(2);

  React.useEffect(() => {
    const isCodAvailable = hasOnlyStaticProducts && !hasNonStaticProducts && staticProductIds.length > 0;
    if (selectedMethod === 'cod' && !isCodAvailable) {
      onMethodSelect('card', 'Credit/Debit Card', CardIcon);
    }
  }, [cartItems, selectedMethod, onMethodSelect, hasOnlyStaticProducts, hasNonStaticProducts, staticProductIds.length]);

  // TabbyCard integration: always show TabbyCard widget
  useEffect(() => {
    if (!document.getElementById('tabby-card-js')) {
      const script = document.createElement('script');
      script.src = 'https://checkout.tabby.ai/tabby-card.js';
      script.id = 'tabby-card-js';
      script.onload = () => {
        if (window.TabbyCard) {
          new window.TabbyCard({
            selector: '#tabbyCard',
            currency: 'AED',
            price: (Number(subtotal) || 0).toFixed(2),
            lang: 'en',
            shouldInheritBg: false,
            publicKey: TABBY_PUBLIC_KEY,
            merchantCode: TABBY_MERCHANT_CODE
          });
        }
      };
      document.body.appendChild(script);
    } else if (window.TabbyCard) {
      new window.TabbyCard({
        selector: '#tabbyCard',
        currency: 'AED',
        price: (Number(subtotal) || 0).toFixed(2),
        lang: 'en',
        shouldInheritBg: false,
        publicKey: TABBY_PUBLIC_KEY,
        merchantCode: TABBY_MERCHANT_CODE
      });
    }
  }, [subtotal]);

  return (
    <div className="pm-wrapper">
      <h3>Payment methods</h3>
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
                  <img src={MasterCardIcon} alt="Mastercard" className="card-icon" />
                  <img src={AmexIcon} alt="American Express" className="card-icon" />
                  <img src="https://aimg.kwcdn.com/upload_aimg/temu/ebeb26a5-1ac2-4101-862e-efdbc11544f3.png.slim.png" alt="Discover" className="card-icon" />
                  <img src={ApplePayIcon} alt="Diners Club" className="card-icon" />
                  <img src={GooglePayIcon} alt="JCB" className="card-icon" />
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Tabby Payment Method (official checkout snippet) */}
        <div className="payment-method-item tabby-checkout-method" style={{width:'100%'}}>
          <input
            type="radio"
            id="tabby"
            name="payment-method"
            checked={selectedMethod === 'tabby'}
            onChange={() => onMethodSelect('tabby', 'Tabby', TabbyIcon)}
          />
          <label htmlFor="tabby" className="payment-method-label" style={{width:'100%'}}>
            <div className="payment-method-content" style={{width:'100%'}}>
              <div style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                width:'100%',
                background:'#fff',
                borderRadius:'16px',
                border:'1px solid #e5e5e5',
                padding:'2px 0',
                boxShadow:'0 2px 8px 0 rgba(0,0,0,0.03)',
                position:'relative',
                marginLeft:0,
                opacity: selectedMethod === 'tabby' ? 1 : 0.7,
                filter: selectedMethod === 'tabby' ? 'none' : 'grayscale(0.3)'
              }}>
                {/* TabbyCard container - always show */}
                <div id="tabbyCard" style={{marginTop:'0px', width:'100%'}}></div>
              </div>
            </div>
          </label>
        </div>

        {/* Tamara */}
        <div className="payment-method-item">
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
        </div>

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
