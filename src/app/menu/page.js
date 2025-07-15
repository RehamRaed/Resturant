"use client";

import { menu } from "@/data";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MenuPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1536); 
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div
      className="mt-[120px] mb-5 md:mt-[5px] p-4 lg:px-20 xl:px-40
                 min-h-screen flex flex-col md:flex-row items-center"
    >
      {menu.map((category) => {
        const content = (
          <div
            className={`w-full bg-cover p-8 h-1.5/2 flex items-start ${
              isLargeScreen ? "cursor-default" : "cursor-pointer hover:opacity-90 transition-opacity duration-300"
            }`}
            style={{ backgroundImage: `url(${category.img})` }}
          >
            <div className={`text-${category.color} w-1/2 flex flex-col`}>
              <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
              <p className="text-sm my-8">{category.desc}</p>

              {isLargeScreen && (
                <Link
                  href={`/menu/${category.slug}`}
                  className={`
                    bg-${category.color}
                    text-${category.color === "black" ? "white" : "red-500"}
                    py-2 px-4 rounded-md w-fit cursor-pointer
                    hidden 2xl:inline-block
                  `}
                >
                  Explore
                </Link>
              )}
            </div>
          </div>
        );

        return isLargeScreen ? (
          <div key={category.id} className="w-full">
            {content}
          </div>
        ) : (
          <Link
            key={category.id}
            href={`/menu/${category.slug}`}
            className="w-full"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
};

export default MenuPage;
