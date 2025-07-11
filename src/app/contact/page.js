"use client";
import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10  mt-[101px] md:mt-[128px]">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-10 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-red-500 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg">
            Don’t hesitate to get in touch with us — whether you’re reporting an
            issue, sharing feedback, or just saying hello. Your words mean the
            world to us and help keep our kitchen full of passion❤️
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="auth-input"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="auth-input"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="auth-input md:col-span-2"
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            placeholder="Your message..."
            rows="5"
            className="auth-input w-full resize-none"
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-lg shadow-md transition-all duration-300 w-full text-lg font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
