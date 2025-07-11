"use client";

import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";
import { useCart } from "../../context/CartContext";
import { ibmPlexSans } from "../fonts/font";

function Offer() {
  const { cartItems, addToCart } = useCart();

  const handleOrderNow = () => {
    const offerId = "burger-offer-001";

    const alreadyInCart = cartItems.find((item) => item.id === offerId);

    if (!alreadyInCart) {
      const product = {
        id: offerId,
        title: "Burger Offer",
        price: 10,
        image: "/offer.png",
        fromOffer: true,
      };

      addToCart(product, 1);
    }
  };

  return (
        <div className="relative h-screen md:h-[60vh] bg-fixed bg-cover bg-center bg-no-repeat bg-[url('/offerBg.jpg')] flex flex-col md:flex-row md:justify-between">
        <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6 bg-black/50">
        <h1
          className={
            ibmPlexSans.className +
            " text-white text-3xl font-bold lg:text-4xl xl:text-5xl"
          }
        >
          Tasty Burger & French Fry
        </h1>
        <p className="text-white xl:text-xl max-w-lg">
          Enjoy our mouth-watering burger served with crispy french fries, all
          for just <span className="font-bold">$10</span>. Fresh ingredients,
          juicy flavors, and the perfect meal to satisfy your cravings.
        </p>
        <CountDown />
        <button
          className="bg-red-500 text-white rounded-md py-3 px-6 cursor-pointer"
          onClick={handleOrderNow}
        >
          Order Now
        </button>
      </div>

      <div className="flex-1 w-full relative md:h-full">
        <Image
          src="/offer.png"
          alt="Delicious Burger and French Fry"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default Offer;
