/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'auri-black': '#111111',
        'auri-dark': '#2D2C2C',
        'auri-gray': '#8D8C8C',
        'auri-light': '#E3E3E3',
        'auri-white': '#FAFAFA',
        'auri-blue': '#00A8FF',
      },
      fontFamily: {
        michroma: ['Michroma', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
