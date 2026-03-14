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
          bg: '#0B0B0F',
          text: '#F5F1E8',
          accent: '#F4A300',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}