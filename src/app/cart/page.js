"use client";
import Link from "next/link";
import { useCart } from "../../../context/CartContext";
import Image from "next/image";

function CartPage() {
  const { cartItems, totalPrice, removeFromCart } = useCart();

  return (
    <div className="min-h-screen pt-[101px] md:pt-[128px]">
      <div className="px-4 sm:px-8 py-10 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-red-600 text-center tracking-wide">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-gray-500 text-center text-lg mt-20">
            Your cart is empty !
          </div>
        ) : (
          <div className="flex flex-col gap-6 flex-grow">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.option}-${index}`}
                className="flex  md:flex-row justify-between items-center bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-2/3">
                  <h2 className="-semibold text-lg md:text-xl text-gray-800 mb-1">
                    {item.title}{" "}
                    {item.option && (
                      <span className="text-sm text-gray-500 ">
                        ({item.option})
                      </span>
                    )}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="flex flex-col items-end w-1/3 mt-4 md:mt-0 gap-2">
                  <p className="font-bold text-green-600 text-lg">
                    {(
                      (item.price + (item.additionalPrice || 0)) *
                      item.quantity
                    ).toFixed(2)}
                    $
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => removeFromCart(item.id, item.option)}
                      title="Remove"
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <Image
                        src="/delete.png"
                        alt="Delete"
                        width={22}
                        height={22}
                        className="hover:opacity-80"
                      />
                    </button>

                    {!item.fromOffer && (
                      <Link
                        href={`/product/${
                          item.id
                        }?fromCart=true&option=${encodeURIComponent(
                          item.option
                        )}&quantity=${item.quantity}`}
                        title="Edit"
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <Image
                          src="/edit.png"
                          alt="Edit"
                          width={22}
                          height={22}
                          className="hover:opacity-80"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <hr className="my-4 border-gray-500" />

            <div className="text-right">
              <h2 className="text-2xl font-bold">
                Total:{" "}
                <span className="text-green-600">{totalPrice.toFixed(2)}$</span>
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
