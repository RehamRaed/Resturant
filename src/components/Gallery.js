"use client";
import React from "react";
import Image from "next/image";
import { galleryImages } from "@/data";

const Gallery = () => {
  return (
    <div className="py-10 px-4 flex justify-center">
      <div className="w-full max-w-screen-xl px-10 sm:px-15 md:px-18 lg:px-20 xl:px-20">
        <h1 className="text-3xl font-bold mb-10 text-center text-red-500 transition-all duration-500 ease-in-out">
          Customer Gallery
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={item.imageUrl}
                alt={item.caption}
                width={400}
                height={300}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />

              <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-60 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-80 transition-opacity duration-500 ease-in-out">
                <p className="text-xl font-semibold mb-2">{item.userName}</p>
                <p className="text-md mb-1 text-center px-4">{item.caption}</p>
                <p className="text-sm">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
