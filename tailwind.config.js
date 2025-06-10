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
        // Light mode colors (default)
        primary: '#669D58',
        'primary-900': '#466C3D',
        'primary-500': '#466C3D',
        'primary-200': '#A9CAA1',
        secondary: '#3B3D3B',
        accent: '#F5F5F5',
        'accent-2': '#FFFFFF',
        'background-primary': '#FFFFFF',
        'background-secondary': '#e5e5e5',
        'text-primary': '#6B6B6B',
        'text-title': '#282525',
        border: 'rgba(0,0,0,0.1)',
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c',
      },
    },
  },
  darkMode: 'media', // uses system theme by default
  plugins: [],
} 