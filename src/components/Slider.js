"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ibmPlexSans } from "../fonts/font";

import slide1 from "../../src/assets/slide1.jpg";
import slide2 from "../../src/assets/slide2.jpg";
import slide3 from "../../src/assets/slide3.png";

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: slide1,
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: slide2,
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: slide3,
  },
];

function Slide() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row mt-[101px] md:mt-[128px]">
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold">
        <h1
          className={
            ibmPlexSans.className +
            " text-4xl text-center uppercase p-4 md:p-10 md:text-5xl lg:text-6xl xl:text-7xl transition-all duration-500 ease-in-out"
          }
        >
          {data[currentSlide].title}
        </h1>
        <Link
          className="bg-red-500 text-white rounded-md py-3 px-6 transition-all duration-500 ease-in-out"
          href="/menu"
        >
          Order Now
        </Link>
      </div>
      <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt="Slide Image"
          fill
          placeholder="blur"
          className="object-cover transition-all duration-500 ease-in-out"
        />
      </div>
    </div>
  );
}

export default Slide;
