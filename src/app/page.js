import React from "react";
import Slider from '@/components/Slider';
import Order from "@/components/order";
import Featured from '@/components/Featured';
import Offer from '@/components/Offer';
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <div >
      <main>
        <Slider />
        <Order />
        <Featured />
        <Offer />
        <Gallery />
      </main>
    </div>
  );
};