import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

const CART_ITEMS_KEY = 'myapp_cartItems';
const CART_OPEN_KEY = 'myapp_cartIsOpen';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = sessionStorage.getItem(CART_ITEMS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(() => {
    try {
      const stored = sessionStorage.getItem(CART_OPEN_KEY);
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  // Save cartItems to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Save isCartOpen to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(CART_OPEN_KEY, JSON.stringify(isCartOpen));
  }, [isCartOpen]);

  // Auto-close cart if empty
  useEffect(() => {
    if (cartItems.length === 0) {
      setIsCartOpen(false);
    }
  }, [cartItems]);

  const addToCart = useCallback((product, showCart = true) => {
    setCartItems((prev) => {
      const existing = prev.find(item =>
        item.id === product.id &&
        JSON.stringify(item.variation || []) === JSON.stringify(product.variation || [])
      );

      if (existing) {
        return prev.map(item =>
          item.id === product.id &&
          JSON.stringify(item.variation || []) === JSON.stringify(product.variation || [])
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });

    if (showCart) {
      setIsCartOpen(true);
    }
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCartItems([]), []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
