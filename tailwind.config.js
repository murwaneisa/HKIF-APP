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
        brand: {
          DEFAULT: '#2082E4', // Main brand blue
          deep: '#2365E2',     // Deep primary (titles, headers)
          main : '#1C8FE7',     // Primary button or link
          light: '#0FB4EC',     // Hover state, border light
        },
        surface: {
          primary: '#FFFFFF',   // Cards, modals
          secondary: '#E5E5E5', // Inputs, secondary backgrounds
        },
        text: {
          primary: '#1C8FE7',   // Primary blue text (if needed)
          title: '#0F172A',     // Almost black for readability
        },
        feedback: {
          success: '#14DDAC',   // Lime teal - success messages
          warning: '#f39c12',   // Standard warning
          error: '#e74c3c',     // Standard error
        },
        border: 'rgba(0,0,0,0.1)',   // Default light border
        accent: '#06DCD5',           // Secondary highlight
        'accent-2': '#00DAF0',       // Tertiary or tag color
      }
    },
  },
  darkMode: 'class', // uses system theme by default
  plugins: [],
} 