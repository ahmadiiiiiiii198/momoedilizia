/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./admin/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2ba8b4',
          dark: '#1e7f88',
          light: '#4ec1cb'
        },
        dark: '#1a1a1a',
        sidebar: '#0f172a',
        card: '#ffffff',
        page: '#f1f5f9'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}