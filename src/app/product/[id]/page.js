"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useCart } from "../../../../context/CartContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { featuredProducts, pizzas, burgers, italians } from "@/data";

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const fromCart = searchParams.get("fromCart") === "true";
  const id = params?.id;

  const optionFromUrl = searchParams.get("option");
  const quantityFromUrl = Number(searchParams.get("quantity"));

  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const allProducts = [
      ...featuredProducts,
      ...pizzas,
      ...burgers,
      ...italians,
    ];

    const prod = allProducts.find((p) => p.id === id);
    setProduct(prod || null);
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const defaultOption = product.options?.[0]?.title || null;

    if (optionFromUrl) {
      setSelectedOption(optionFromUrl);
      setQuantity(quantityFromUrl > 0 ? quantityFromUrl : 1);
    } else {
      setSelectedOption(defaultOption);

      const cartItem = cartItems.find(
        (item) => item.id === product.id && item.option === defaultOption
      );

      if (cartItem) {
        setQuantity(cartItem.quantity);
      } else {
        setQuantity(1);
      }
    }
  }, [product, cartItems, optionFromUrl, quantityFromUrl]);

  if (!product)
    return (
      <p className="p-8 text-center text-red-600 font-semibold">
        Product not found!
      </p>
    );

  const getPriceWithOption = () => {
    if (!selectedOption || !product.options) return product.price;

    const opt = product.options.find((o) => o.title === selectedOption);
    return opt ? product.price + opt.additionalPrice : product.price;
  };

  const handleSave = () => {
    addToCart(product, selectedOption, quantity, true);
    router.push("/cart");
  };

  const handleAdd = () => {
    addToCart(product, selectedOption, quantity);
  };

  return (
    <div className=" mt-[101px] md:mt-[128px] p-4 lg:px-20 xl:px-40 min-h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {product.img && (
        <div className="relative w-full h-1/2 md:h-[70%] flex justify-center items-center">
          <Image
            src={product.img}
            alt={product.title}
            width={400}
            height={300}
            className="object-contain"
          />
        </div>
      )}

      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {product.title}
        </h1>
        <p>{product.desc}</p>

        {product.options?.length > 0 && (
  <div>
    <label className="font-semibold">Choose Size:</label>
    <div className="flex gap-3 max-[392px]:gap-2 md:gap-4 flex-wrap mt-2 transition-all duration-300 ">
      {product.options.map((opt) => (
        <button
          key={opt.title}
          onClick={() => setSelectedOption(opt.title)}
          className={`w-[7rem] max-[392px]:w-[6.3rem] md:w-[8.5rem] py-1.5 rounded-lg font-medium border transition-all duration-300           
            ${
              selectedOption === opt.title
                ? "bg-red-500 text-white border-red-500 shadow-md scale-105"
                : "bg-white text-red-500 border-red-300 hover:bg-red-100 hover:border-red-400"
            }
          `}
        >
          {opt.title} {opt.additionalPrice > 0 ? `+${opt.additionalPrice}$` : ""}
        </button>
      ))}
    </div>
  </div>
)}


        <div className="flex gap-2">
          <span className="text-lg font-semibold text-gray-700">
            Quantity :
          </span>
          <div className="flex items-center gap-4 text-lg">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="text-red-500 hover:text-red-700 transition-transform duration-200 hover:-translate-y-0.5"
            >
              -
            </button>
            <span className="font-bold">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
              className="text-red-500 hover:text-red-700 transition-transform duration-200 hover:-translate-y-0.5"
            >
              +
            </button>
          </div>
        </div>

        <p className="font-bold text-xl text-green-600 mt-4">
          Total Price: {(getPriceWithOption() * quantity).toFixed(2)}$
        </p>

        {fromCart ? (
          <button
            className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 text-white"
            onClick={handleSave}
          >
            Save Changes
          </button>
        ) : (
          <button
            className="bg-red-500 px-6 py-3 rounded text-white hover:bg-red-600 transition mt-4"
            onClick={handleAdd}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
