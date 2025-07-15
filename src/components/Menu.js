"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { motion, AnimatePresence } from "framer-motion";

function Menu() {
  const [open, setOpen] = useState(false);
  const links = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Menu", url: "/menu" },
    { id: 3, title: "Contact", url: "/contact" },
    { id: 4, title: "Login", url: "/login" }
  ];

  return (
    <div className="relative z-50">
      <div className="fixed top-15 right-5 z-[1000]">
        <Image
          src={open ? "/close.png" : "/open.png"}
          alt={open ? "Close Menu" : "Open Menu"}
          width={32}
          height={32}
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer transition-transform hover:scale-110"
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ scale: 0, rotate: 45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 45, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 right-0 w-[45%] h-[585px] bg-white backdrop-blur-md text-white rounded-bl-[300px] shadow-2xl z-[999] flex flex-col justify-center items-center gap-8 px-6"
            style={{ transformOrigin: "top right", fontSize: "18px" }}
          >
            {links.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={() => setOpen(false)}
                className="transition-all duration-200 hover:bg-red-200 bg-red-100 text-red-500 px-5 py-1 rounded-xl shadow-md hover:scale-105"
              >
                {item.title}
              </Link>
            ))}
             <div
            className="flex items-center gap-1 cursor-pointer text-red-500"
          >
            <span>📞123456789</span>
          </div> 

            <Link href="/cart" onClick={() => setOpen(false)}>
              <CartIcon />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Menu;