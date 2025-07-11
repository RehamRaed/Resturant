import { menu } from "@/data";
import Link from "next/link";
import React from "react";

const MenuPage = () => {
  return (
    <div
      className="mt-[120px] md:mt-[5px] p-4 lg:px-20 xl:px-40
                 min-h-screen flex flex-col md:flex-row items-center"
    >
      {menu.map((category) => (
        <div
          key={category.id}
          className="w-full bg-cover p-8 h-1.5/2 flex items-start cursor-default"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-1/2 flex flex-col`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8">{category.desc}</p>

            <Link
              href={`/menu/${category.slug}`}
              className={`
                hidden 2xl:inline-block
                bg-${category.color}
                text-${category.color === "black" ? "white" : "red-500"}
                py-2 px-4 rounded-md w-fit cursor-pointer
              `}
            >
              Explore
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
