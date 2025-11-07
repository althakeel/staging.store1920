import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/ButtonSection.css';
import { useCart } from '../../contexts/CartContext';

export default function ButtonSection({ product, selectedVariation, quantity, isClearance }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const variation = selectedVariation || product;

  const handleAddToCart = () => {
    const itemId = variation.id;
    const itemPrice = variation.price || product.price;

    const itemToAdd = {
      id: itemId,
      name: product.name,
      quantity: quantity,
      price: itemPrice,
      image: variation.image?.src || product.images?.[0]?.src || '',
      variation: selectedVariation?.attributes || [],
    };

    addToCart(itemToAdd);
    setAddedToCart(true);
    setIsCartOpen(true);

    if (isClearance) {
      navigate('/checkout');
    }
  };

  const handleGoToCart = () => navigate('/cart');
  const handleGoToCheckout = () => navigate('/checkout');

  useEffect(() => {
    setAddedToCart(false);
  }, [quantity, variation?.id]);

  if (isClearance) {
    return (
      <div className="button-section">
        <button className="buy-now-btn" onClick={handleAddToCart}>
          Buy Now
        </button>
      </div>
    );
  }

  return (
    <div className="button-section">
      {!addedToCart ? (
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      ) : (
        <>
          <button className="go-to-cart-btn" onClick={handleGoToCart}>
            Go to Cart
          </button>
          <button className="go-to-checkout-btn" onClick={handleGoToCheckout}>
            Go to Checkout
          </button>
        </>
      )}
    </div>
  );
}
