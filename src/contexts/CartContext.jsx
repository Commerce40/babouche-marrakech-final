import React, { createContext, useContext, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PRODUCTS } from '../utils/products';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('babouche-cart', []);
  const cartIconRef = useRef();

  const addToCart = (product, options = {}) => {
    setCart((currentCart) => {
      const itemIdentifier = `${product.id}-${options.color}-${options.size}`;
      const existingItem = currentCart.find(
        (item) => `${item.productId}-${item.color}-${item.size}` === itemIdentifier
      );

      if (existingItem) {
        return currentCart.map((item) =>
          `${item.productId}-${item.color}-${item.size}` === itemIdentifier
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [
        ...currentCart,
        {
          productId: product.id,
          qty: 1,
          color: options.color || '-',
          size: options.size || '-',
        },
      ];
    });
  };

  const removeFromCart = (index) => {
    setCart((currentCart) => currentCart.filter((_, i) => i !== index));
  };

  const updateQty = (index, qty) => {
    setCart((currentCart) =>
      currentCart.map((item, i) => (i === index ? { ...item, qty } : item))
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    return acc + (product ? product.price * item.qty : 0);
  }, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartTotal,
    cartIconRef,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};