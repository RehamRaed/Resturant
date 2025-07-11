
import { pizzas, burgers, italians } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const dataMap = {
  pizzas,
  burgers,
  italians,
};

const CategoryPage = ({ params }) => {
  const { category } = params;
  const items = dataMap[category];

  if (!items) {
    return (
      <div className="mt-40 text-center text-2xl text-gray-600">
        Category not found...
      </div>
    );
  }

  return (
    <div className="px-10 md:px-20 lg:px-25 xl:px-35 py-10 min-h-screen mt-[101px] md:mt-[128px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="relative w-full h-64 bg-white flex items-center justify-center">
  <Image
    src={item.img}
    alt={item.title}
    width={250}
    height={250}
    className="object-contain"
  />
</div>


            <div className="p-5 flex flex-col gap-2">
              <h2 className="text-lg font-bold text-gray-800 uppercase">
                {item.title}
              </h2>
              <div className="flex items-center justify-between">
                <span className="text-red-600 text-base font-semibold">
                  {item.price}$
                </span>
                <Link
                 href={`/product/${item.id}`}
                  className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out bg-red-500 text-white text-xs px-3 py-1 rounded-md "
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
