/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./Components/**/*.{js,jsx,ts,tsx}",
    "./Screens/**/*.{js,jsx,ts,tsx}",
    "./Utilities/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // You can add your custom colors here
        primary: '#3B82F6',
        secondary: '#1F2937',
        accent: '#F59E0B',
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
} 