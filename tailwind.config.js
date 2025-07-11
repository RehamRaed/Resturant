/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",     
    "./src/**/*.{js,ts,jsx,tsx}",      
  ],
  safelist: [
    "bg-black",
    "bg-white",
    "text-white",
    "text-red-500",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
