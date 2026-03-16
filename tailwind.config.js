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
          bg: 'var(--color-brand-bg)',
          text: 'var(--color-brand-text)',
          accent: 'var(--color-brand-accent)',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}