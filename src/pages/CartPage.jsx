import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import CartMessages from '../components/sub/CartMessages';
import ProductsUnder20AED from '../components/ProductsUnder20AED';
import '../assets/styles/cart.css';

export default function CartPage() {
  const { cartItems } = useCart();
  const [discount, setDiscount] = useState(0);
  const [sidebarTop, setSidebarTop] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      const headerHeight = 20; // adjust if you have a fixed header
      setSidebarTop(headerHeight + 20);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = Math.max(subtotal - discount, 0);

  return (
    <div className="cartPageWrapper">
      <div className="cartGrid">
        {/* Left Column */}
        <section className="cartLeft">
          <CartMessages />
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          )}

          <ProductsUnder20AED />
        </section>

        {/* Right Column - Sticky Sidebar */}
        <aside className="cartRightWrapper">
          <div
            className="cartRightFixed"
            style={{ top: `${sidebarTop}px` }}
          >
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
              onCheckout={() => (window.location.href = '/checkout')}
            />
          </div>
        </aside>
      </div>

      {/* Mobile Floating Checkout Button */}
      {cartItems.length > 0 && (
  <div className="mobileCheckoutBtnWrapper">
    <button
      className="checkoutBtn"
      onClick={() => (window.location.href = '/checkout')}
    >
      Go to Checkout
    </button>
  </div>
)}
    </div>
  );
}
