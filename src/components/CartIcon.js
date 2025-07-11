"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";

function CartIcon() {
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex items-center gap-1 relative">
      <div className="relative w-8 h-8 md:w-6 md:h-6">
        <Image src="/cart.png" alt="cart" fill />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default CartIcon;
