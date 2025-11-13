import React, { useEffect, useState } from 'react';
import '../../assets/styles/checkoutleft/paymentmethods.css';

// ICONS
import CardIcon from '../../assets/images/tabby/creditcard.webp';
import TabbyIcon from '../../assets/images/Footer icons/3.webp';
import TamaraIcon from '../../assets/images/Footer icons/6.webp';
import CashIcon from '../../assets/images/Footer icons/13.webp';
import MasterCardIcon from '../../assets/images/Footer icons/16.webp';
import AmexIcon from '../../assets/images/Footer icons/11.webp';
import ApplePayIcon from '../../assets/images/Footer icons/2.webp';
import GooglePayIcon from '../../assets/images/Footer icons/12.webp';

// Static Products
let staticProducts = [];
try {
  const staticProductsModule = require('../../data/staticProducts');
  staticProducts = staticProductsModule.default || staticProductsModule || [];
} catch {
  console.warn('Static products not loaded');
  staticProducts = [];
}

// API Keys
const TABBY_PUBLIC_KEY = 'pk_test_019a4e3b-c868-29ff-1078-04aec08847bf';
const TABBY_MERCHANT_CODE = 'Store1920';
const TAMARA_PUBLIC_KEY = '610bc886-8883-42f4-9f61-4cf0ec45c02e';

const PaymentMethods = ({ selectedMethod, onMethodSelect, subtotal, cartItems = [] }) => {
  const [showCodPopup, setShowCodPopup] = useState(false);

  const amount = Number(subtotal) || 0;
  const tabbyInstallment = (amount / 4).toFixed(2);

  // Static product logic
  let staticProductIds = [];
  try {
    staticProductIds = staticProducts.flatMap((p) => {
      const ids = [p.id];
      if (Array.isArray(p.bundles)) {
        p.bundles.forEach((b) => b.id && ids.push(b.id));
      }
      return ids;
    });
  } catch {
    staticProductIds = [];
  }

  const hasOnlyStaticProducts =
    cartItems.length > 0 &&
    staticProductIds.length > 0 &&
    cartItems.every((item) => staticProductIds.includes(item.id));

  const hasNonStaticProducts =
    staticProductIds.length > 0 &&
    cartItems.some((item) => !staticProductIds.includes(item.id));

  // Default method
  useEffect(() => {
    if (!selectedMethod && subtotal > 0) {
      onMethodSelect('tabby', 'Tabby', TabbyIcon);
    }
  }, [selectedMethod, subtotal, onMethodSelect]);

  // Prevent invalid COD
  useEffect(() => {
    const isCodAvailable = hasOnlyStaticProducts && !hasNonStaticProducts && staticProductIds.length > 0;
    if (selectedMethod === 'cod' && !isCodAvailable) {
      onMethodSelect('card', 'Credit/Debit Card', CardIcon);
    }
  }, [cartItems, selectedMethod, onMethodSelect, hasOnlyStaticProducts, hasNonStaticProducts]);

  // TABBY WIDGET
  useEffect(() => {
    const loadTabby = () => {
      if (window.TabbyCard) {
        new window.TabbyCard({
          selector: '#tabbyCard',
          currency: 'AED',
          price: amount.toFixed(2),
          lang: 'en',
          shouldInheritBg: false,
          publicKey: TABBY_PUBLIC_KEY,
          merchantCode: TABBY_MERCHANT_CODE,
        });
      }
    };

    if (!document.getElementById('tabby-card-js')) {
      const script = document.createElement('script');
      script.src = 'https://checkout.tabby.ai/tabby-card.js';
      script.id = 'tabby-card-js';
      script.onload = loadTabby;
      document.body.appendChild(script);
    } else {
      loadTabby();
    }
  }, [amount]);

  // ✅ TAMARA OFFICIAL WIDGET
  useEffect(() => {
    const loadTamaraWidget = () => {
      if (window.TamaraInstallmentPlan) {
        window.TamaraInstallmentPlan.init({
          lang: 'en',
          currency: 'AED',
          publicKey: TAMARA_PUBLIC_KEY,
        });
        window.TamaraInstallmentPlan.render();
      }
    };

    if (!document.getElementById('tamara-widget-js')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.tamara.co/widget/installment-plan.min.js';
      script.id = 'tamara-widget-js';
      script.async = true;
      script.onload = loadTamaraWidget;
      document.body.appendChild(script);
    } else {
      loadTamaraWidget();
    }
  }, [amount]);

  return (
    <div className="pm-wrapper">
      <h3>Payment methods</h3>

      {cartItems.length > 0 && hasNonStaticProducts && staticProductIds.length > 0 && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '4px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '14px',
            color: '#856404',
          }}
        >
          ℹ️ Cash on Delivery is only available for selected products. Your cart contains items that require online payment.
        </div>
      )}

      <div className="payment-methods-list">
        {/* CARD */}
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
                  <img src={AmexIcon} alt="Amex" className="card-icon" />
                  <img src={ApplePayIcon} alt="Apple Pay" className="card-icon" />
                  <img src={GooglePayIcon} alt="Google Pay" className="card-icon" />
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* TABBY */}
        <div className="payment-method-item tabby-checkout-method" style={{ width: '100%' }}>
          <input
            type="radio"
            id="tabby"
            name="payment-method"
            checked={selectedMethod === 'tabby'}
            onChange={() => onMethodSelect('tabby', 'Tabby', TabbyIcon)}
          />
          <label htmlFor="tabby" className="payment-method-label" style={{ width: '100%' }}>
            <div className="payment-method-content" style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  background: '#fff',
                  borderRadius: '16px',
                  border: '1px solid #e5e5e5',
                  padding: '2px 0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  opacity: selectedMethod === 'tabby' ? 1 : 0.7,
                  filter: selectedMethod === 'tabby' ? 'none' : 'grayscale(0.3)',
                }}
              >
                <div id="tabbyCard" style={{ width: '100%' }}></div>
              </div>
            </div>
          </label>
        </div>

        {/* ✅ TAMARA OFFICIAL INSTALLMENT WIDGET */}
        <div className="payment-method-item tamara-checkout-method" style={{ width: '100%' }}>
          <input
            type="radio"
            id="tamara"
            name="payment-method"
            checked={selectedMethod === 'tamara'}
            onChange={() => onMethodSelect('tamara', 'Tamara', TamaraIcon)}
          />
          <label htmlFor="tamara" className="payment-method-label" style={{ width: '100%' }}>
            <div className="payment-method-content" style={{ width: '100%' }}>
              <div
                className="tamara-installment-plan-widget"
                data-lang="en"
                data-country-code="AE"
                data-price={amount}
                data-currency="AED"
                data-number-of-installments="4"
              ></div>
            </div>
          </label>
        </div>

        {/* CASH ON DELIVERY */}
        {hasOnlyStaticProducts && !hasNonStaticProducts && (
          <div className="payment-method-item">
            <input
              type="radio"
              id="cod"
              name="payment-method"
              checked={selectedMethod === 'cod'}
              onChange={() => onMethodSelect('cod', 'Cash on Delivery', CashIcon)}
            />
            <label htmlFor="cod" className="payment-method-label">
              <span>Cash on Delivery</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
