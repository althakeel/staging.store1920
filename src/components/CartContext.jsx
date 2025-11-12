// CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        // Increase quantity
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // open cart on add
  };

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  const toggleCart = () => setIsCartOpen((open) => !open);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, isCartOpen, toggleCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
