/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#ffedd5',
          DEFAULT: '#f97316',
          dark: '#c2410c',
        }
      }
    },
  },
  plugins: [],
}