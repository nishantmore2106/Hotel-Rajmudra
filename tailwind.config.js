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
        },
        'deep-space': 'var(--color-deep-space)',
        'deep-forest': 'var(--color-deep-forest)',
        'forest-mid': 'var(--color-forest-mid)',
        'forest-light': 'var(--color-forest-light)',
        midnight: 'var(--color-midnight)',
        'gold-light': 'var(--color-gold-light)',
        'gold-dark': 'var(--color-gold-dark)',
        'gold-accent': 'var(--color-gold-accent)',
        'gold-muted': 'var(--color-gold-muted)',
        cream: 'var(--color-cream)',
        'cream-soft': 'var(--color-cream-soft)',
        'glass-border': 'var(--color-glass-border)',
        'glass-bg': 'var(--color-glass-bg)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['"Malik"', 'sans-serif'],
        display: ['"Malik"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        full: '9999px',
      }
    },
  },
  plugins: [],
}