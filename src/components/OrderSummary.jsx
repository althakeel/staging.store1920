import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/orderSummary.css";
import TrustSection from "./checkout/TrustSection";

export default function OrderSummary({
  subtotal,
  discount,
  total,
  onCheckout,
  minCheckoutAmount = null,
}) {
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponAmount, setCouponAmount] = useState(0);
  const [minAmount, setMinAmount] = useState(minCheckoutAmount);
  const [loadingMin, setLoadingMin] = useState(true);

  useEffect(() => {
    if (minCheckoutAmount === null || minCheckoutAmount === undefined) {
      fetch("/wp-json/mytheme/v1/min_checkout_amount")
        .then((res) => res.json())
        .then((data) => {
          const val = parseFloat(data?.min_checkout_amount);
          if (!isNaN(val) && val > 0) {
            setMinAmount(val);
          } else {
            setMinAmount(null);
          }
        })
        .catch(() => {
          setMinAmount(null);
        })
        .finally(() => setLoadingMin(false));
    } else {
      setLoadingMin(false);
    }
  }, [minCheckoutAmount]);

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === "temu10") {
      const newDiscount = subtotal * 0.1;
      setCouponAmount(newDiscount);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponAmount(0);
      setCouponError("Invalid coupon code");
    }
  };

  const totalAfterCoupon = total - couponAmount;
  const isMinSet = minAmount && minAmount > 0;
  const canCheckout = !isMinSet || totalAfterCoupon >= minAmount;

  return (
    <section className="os-container" aria-label="Order Summary">
      <h3 className="os-title">Order Summary</h3>

      

      <div className="os-row">
        <span>Item(s) total:</span>
        <span className="os-strike">AED {(subtotal + discount).toFixed(2)}</span>
      </div>

      <div className="os-row os-discount">
        <span>Item(s) discount:</span>
        <span>-AED {discount.toFixed(2)}</span>
      </div>

      <div className="os-row">
        <span></span>
        <span>AED {subtotal.toFixed(2)}</span>
      </div>

      {couponApplied && (
        <div className="os-row os-discount">
          <span>Coupon discount:</span>
          <span className="os-small-discount">-AED {couponAmount.toFixed(2)}</span>
        </div>
      )}

      <hr className="os-separator" />

      <div className="os-row os-total-row">
        <span>Total</span>
        <span>AED {totalAfterCoupon.toFixed(2)}</span>
      </div>

      <p className="os-note">Please refer to your final actual payment amount.</p>
      <p className="os-installment">
  Up to 12 installments with{" "}
  <img
    src="https://levantine.ae/wp-content/uploads/2023/03/tabby-badge.png"
    alt="Tabby"
    className="os-installment-logo"
  /><Tooltip text={tabbyText} /> {" "}
  or 4 interest-free installments of AED {(totalAfterCoupon / 4).toFixed(2)} with{" "}
  <img
    src="https://m.media-amazon.com/images/G/01/support_images/GUID-674F7E9B-5776-4702-A950-A6CC211609E6=1=en-GB=Normal.svg"
    alt="Tamara"
    className="os-installment-logo"
  /><Tooltip text={tamaraText} />.
</p>

      <button
        type="button"
        className={`os-checkout-btn ${!canCheckout ? "disabled" : ""}`}
        onClick={canCheckout ? onCheckout : undefined}
        aria-label={canCheckout ? "Proceed to checkout" : "Minimum order amount required"}
        disabled={!canCheckout}
      >
        {loadingMin
          ? "Checking..."
          : canCheckout
          ? "Proceed to checkout"
          : `Minimum AED ${minAmount?.toFixed(2)} required to checkout`}
      </button>

      {!canCheckout && !loadingMin && (
        <p
          className="os-coupon-error"
          role="alert"
          style={{ marginTop: "10px", textAlign: "center" }}
        >
          You need to add items worth at least AED {minAmount?.toFixed(2)} to checkout.
        </p>
      )}

      {/* <p className="os-almost-sold" aria-live="polite">⏰ 1 almost sold out</p> */}

      {/* <button
        type="button"
        className="os-paypal-btn"
        aria-label="Express checkout with PayPal"
      >
        Express checkout with <strong>PayPal</strong>
      </button> */}

      <p className="os-footnote">
        <span>ⓘ</span> Item availability and pricing are not guaranteed until payment is final.
      </p>
      <TrustSection/>

    </section>
  );
}

const tabbyText = `Shop now, pay later
How it works:
Select Tabby as your payment method at checkout to pay in interest free installments:
Up to 12 installments or 4 interest-free installments with Tabby.
Tabby services are available to any citizen and resident of Saudi Arabia, Kuwait or the UAE, over the age of 18.
`;

const tamaraText = `Tamara: By using the Tamara Services, you warrant and represent that you are over the age of eighteen (18) years.
The process of registering the Tamara Account requires you to provide Tamara with certain personal information.
Such information may include your full name, address, email, phone number, and age.
`;

function Tooltip({ text }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <span
      ref={ref}
      className="os-tooltip-container"
      role="button"
      aria-haspopup="true"
      aria-label="More info"
      onClick={() => setVisible(!visible)}
    >
      <span className="os-tooltip-question">?</span>
      <div className={`os-tooltip-text ${visible ? "visible" : ""}`} role="tooltip">
        {text.split("\n").map((line, i) => (
          <p key={i} className="os-tooltip-line">
            {line.trim()}
          </p>
        ))}
      </div>
    </span>
  );
}
