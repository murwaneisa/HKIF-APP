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
          light: '#BBDEFB',     // Hover state, border light
        },
        accent: {
          DEFAULT: '#06DCD5', // Secondary highlight
          deep: '#14DDAC', // Secondary highlight
          light: '#BBDEFB', // Tertiary or tag color
        },
        surface: {
          primary: '#FFFFFF',   // Cards, modals
          secondary: '#E5E5E5', // Inputs, secondary backgrounds
        },
        text: {
          primary: '#1C8FE7',       // Optional custom blue for links or highlights
          title: '#1F2937',         // gray-800 → Strong headings
          subtitle: '#374151',      // gray-700 → Section headers
          body: '#4B5563',          // gray-600 → Normal paragraph text
          secondary: '#6B7280',     // gray-500 → Notes, less important
          disabled: '#9CA3AF',      // gray-400 → Disabled text or placeholders
          inverse: '#FFFFFF',       // White for dark backgrounds
        },
        feedback: {
          success: '#14DDAC',   // Lime teal - success messages
          warning: '#f39c12',   // Standard warning
          error: '#e74c3c',     // Standard error
        },
        border: '#000000',   // Default light border
      }
    },
  },
  darkMode: 'class', // uses system theme by default
  plugins: [],
} 