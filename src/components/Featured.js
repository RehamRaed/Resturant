"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { featuredProducts } from "@/data";

function Featured() {
  const { addToCart, cartItems } = useCart();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [activeTab, setActiveTab] = useState("choices");

  return (
    <div className="w-screen text-gray-800 py-8">
      <div className=" top-[70px] w-[90%] mx-auto z-10 py-4  md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-6 text-lg md:text-xl font-semibold text-red-600">
          <button
            onClick={() => setActiveTab("choices")}
            className="relative focus:outline-none"
          >
            <span>Our Choices</span>
            {activeTab === "choices" && (
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-red-500 rounded-full"></span>
            )}
          </button>
          <Link
            href="/menu"
            onClick={() => setActiveTab("menu")}
            className="relative focus:outline-none"
          >
            <span>Our Menu</span>
            {activeTab === "menu" && (
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-red-500 rounded-full"></span>
            )}
          </Link>
        </div>

        <Link
          href="/cart"
          className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition text-sm"
          title="Go to cart"
        >
          View Cart( {cartCount} )
        </Link>
      </div>

      <div className="overflow-x-auto mt-4">
        <div className="flex w-max gap-6 px-4 pb-4">
          {featuredProducts.map((item) => (
            <div
              key={item.id}
              className="w-[350px] h-[460px] p-4 rounded-2xl bg-white shadow-md 
                         transition-all duration-300 hover:shadow-xl 
                         flex flex-col items-center justify-around"
            >
              <Link
                href={`/product/${item.id}`}
                className="relative flex-1 w-full h-[40%] block transition-transform duration-500 hover:rotate-[60deg]"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </Link>

              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <h1 className="text-lg font-bold uppercase text-red-600">
                  {item.title}
                </h1>
                <p className="px-2 text-sm text-gray-600 line-clamp-2">
                  {item.desc}
                </p>
                <span className="text-base font-bold text-green-600">
                  {item.price}$
                </span>
              </div>

              <button
                onClick={() =>
                  addToCart(
                    item,
                    item.options ? item.options[0].title : null,
                    1
                  )
                }
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 text-sm mt-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Featured;
