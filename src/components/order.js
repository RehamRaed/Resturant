"use client";
import React, { useState } from "react";
import OrderModal from "./orderModal";
import Image from "next/image";
import { merienda } from "../fonts/font";
export default function Order() {
  const [modalOpen, setModalOpen] = useState(false);
  const [method, setMethod] = useState("pickup");
  const [pickupAddress, setPickupAddress] = useState("San Francisco, CA");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("upTo30");
  const [scheduleHour, setScheduleHour] = useState("");
  return (
    <section className="py-20 text-center px-6 md:px-24 flex flex-col text-left">
      <div>
        <h2 className="text-4xl md:text-5xl font-semibold mb-4">ORDER ONLINE</h2>
        <p className={`${merienda.className} text-md text-gray-700`}>
          Ready for a bite that blows your mind ? We’ve got just the thing
        </p>
        <div className="flex my-5 gap-2 px-4 py-1 rounded-full w-fit border border-black items-center">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />

          <h2 className="text-gray-800 font-semibold text-sm">
            Accepting Orders
          </h2>
        </div>
        <div className="flex w-[90%] [@media(min-width:649px)]:w-[80%] ">
          {["pickup", "delivery"].map((type) => (
            <button
              key={type}
              onClick={() => setModalOpen(true)}
              className={`w-50 text-sm py-3 font-semibold transition-colors duration-200
                ${
                  method === type
                    ? "bg-red-500 text-white "
                    : "bg-white text-gray-700 hover:bg-red-200"
                }`}
            >    
              {type === "pickup" ? "Pickup" : "Delivery"}
            </button>
          ))}
        </div>
        {method === "pickup" ? (
            <div className="flex flex-col mt-2 gap-3 md:gap-6 md:flex-row items-start md:items-center w-full">
            <h4 className="flex items-center gap-1 w-fit">
              <Image src="/time.png" alt="" width={17} height={17} />
              Pickup time :{" "}
              {pickupTime === "upTo30"
                ? "Up to 30 minutes"
                : `Scheduled at ${scheduleHour || "N/A"}`}
              <button
                onClick={() => setModalOpen(true)}
                className="text-[15px] text-gray-600 underline cursor-pointer "
              >
                Change
              </button>
            </h4>
            <h4 className="flex items-center gap-1">
              <Image src="/site.png" alt="" width={17} height={17} />
              Pickup Address : {pickupAddress}
            </h4>
          </div>
        ) : (
          <div className="mt-2 text-left">
            <h4 className="flex items-center gap-1">
              <Image src="/site.png" alt="" width={17} height={17} />
              Delivery Address : {deliveryAddress || "Not specified"}
            </h4>
          </div>
        )}
        <OrderModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          method={method}
          setMethod={setMethod}
          pickupAddress={pickupAddress}
          setPickupAddress={setPickupAddress}
          deliveryAddress={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
          pickupTime={pickupTime}
          setPickupTime={setPickupTime}
          scheduleHour={scheduleHour}
          setScheduleHour={setScheduleHour}
        />
      </div>
    </section>
  );
}