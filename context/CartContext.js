"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, option, quantity = 1, updateQuantity = false) => {
  setCartItems((prevItems) => {
    const selectedOptionObj = product.options?.find((o) => o.title === option);
    const additionalPrice = selectedOptionObj ? selectedOptionObj.additionalPrice || 0 : 0;

    const existingNewOptionIndex = prevItems.findIndex(
      (item) => item.id === product.id && item.option === option
    );

    const existingOldOptionIndex = prevItems.findIndex(
      (item) => item.id === product.id && item.option !== option
    );

    if (updateQuantity) {
      if (existingNewOptionIndex !== -1 && existingOldOptionIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingNewOptionIndex].quantity = quantity;
        updatedItems[existingNewOptionIndex].additionalPrice = additionalPrice;
        updatedItems.splice(existingOldOptionIndex, 1);
        return updatedItems;
      } else if (existingNewOptionIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingNewOptionIndex].quantity = quantity;
        updatedItems[existingNewOptionIndex].additionalPrice = additionalPrice;
        return updatedItems;
      } else if (existingOldOptionIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingOldOptionIndex] = {
          ...updatedItems[existingOldOptionIndex],
          option,
          quantity,
          additionalPrice, 
        };
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            quantity,
            option,
            additionalPrice,
          },
        ];
      }
    } else {
      if (existingNewOptionIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingNewOptionIndex].quantity += quantity;
        updatedItems[existingNewOptionIndex].additionalPrice = additionalPrice; 
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            quantity,
            option,
            additionalPrice,
          },
        ];
      }
    }
  });
};


  const decreaseQuantity = (id, option) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.option === option
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, option) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.option === option))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      (item.price + (item.additionalPrice || 0)) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
