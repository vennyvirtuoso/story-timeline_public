/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: 'var(--primary-color)',
          'primary-hover': 'var(--primary-color-hover)',
          accent: 'var(--accent-color)',
          cream: 'var(--bg-color)',
          'cream-dark': 'var(--bg-color-dark)',
          dark: 'var(--text-color)',
          'rose-safarnama': 'var(--rose-color)',
          'border-theme': 'var(--border-color)',
        },
        fontFamily: {
          sans: ['Figtree', 'sans-serif'],
          heading: ['Cormorant Garamond', 'serif'],
          sub: ['DM Sans', 'sans-serif'],
          cursive: ['Tangerine', 'cursive'],
        },
        boxShadow: {
          'theme-sm': 'var(--shadow-sm)',
          'theme-md': 'var(--shadow-md)',
          'theme-lg': 'var(--shadow-lg)',
        }
      },
    },
    plugins: [],
  }