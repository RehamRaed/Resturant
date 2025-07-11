"use client";
import React, { useState, useEffect } from "react";

export default function OrderModal({
  isOpen,
  onClose,
  method,
  setMethod,
  pickupAddress,
  setPickupAddress,
  deliveryAddress,
  setDeliveryAddress,
  pickupTime,
  setPickupTime,
  scheduleHour,
  setScheduleHour,
}) {
  const today = new Date().toISOString().split("T")[0];

  const canSave =
    method === "pickup"
      ? pickupTime === "schedule"
        ? scheduleHour.trim() !== "" && pickupAddress.trim() !== ""
        : pickupAddress.trim() !== ""
      : deliveryAddress.trim() !== "";

  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => setIsVisible(true), 20);
    } else {
      setIsVisible(false);
      setTimeout(() => setShow(false), 500);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div
        className={`fixed z-50 w-[94%] max-w-xl transition-all duration-500 ease-in-out
          ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
          bg-white rounded-xl shadow-xl p-6 sm:p-8`}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-sm sm:text-base font-semibold text-black text-left">
            How would you like to receive your order?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold leading-none"
          >
            &times;
          </button>
        </div>

        <div className="flex gap-2 sm:gap-4 mb-6">
          <button
            onClick={() => setMethod("pickup")}
            className={`flex-1 text-sm py-2 rounded-full font-semibold border ${
              method === "pickup"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pickup
          </button>
          <button
            onClick={() => setMethod("delivery")}
            className={`flex-1 text-sm py-2 rounded-full font-semibold border ${
              method === "delivery"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Delivery
          </button>
        </div>

        {method === "pickup" && (
          <>
            <label className="block mb-1 font-medium text-gray-700 text-sm text-left">
              Pickup from :
            </label>
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
            />

            <label className="block mb-1 font-medium text-gray-700 text-sm text-left">
              Pickup time :
            </label>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setPickupTime("upTo30")}
                className={`w-9 h-9 rounded-full text-xs font-semibold flex items-center justify-center border ${
                  pickupTime === "upTo30"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                30m
              </button>
              <button
                onClick={() => setPickupTime("schedule")}
                className={`w-9 h-9 rounded-full text-xs font-semibold flex items-center justify-center border ${
                  pickupTime === "schedule"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                📅
              </button>
            </div>

            {pickupTime === "schedule" && (
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Today :
                  </label>
                  <input
                    type="text"
                    value={today}
                    disabled
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-600 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Hour :
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 20:35"
                    value={scheduleHour}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d{0,2}(:\d{0,2})?$/.test(val)) {
                        setScheduleHour(val);
                      }
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
                  />
                </div>
              </div>
            )}
          </>
        )}

        {method === "delivery" && (
          <>
            <p className="mb-3 text-sm text-green-600 font-medium">
              Free delivery for orders above $50!
            </p>
            <label className="block mb-1 font-medium text-gray-700 text-sm text-left">
              Delivery address :
            </label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
              placeholder="Enter delivery address"
            />
          </>
        )}

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
          >
            Cancel
          </button>
          <button
            disabled={!canSave}
            onClick={() => {
              onClose();
            }}
            className={`px-4 py-2 rounded text-white font-semibold text-sm ${
              canSave
                ? "bg-red-500 hover:bg-red-600"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
