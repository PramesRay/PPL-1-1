/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Barlow Condensed', 'sans-serif'],
      },
      colors: {
        bg: '#F4F4F4',
        bgcontainer: '#708090',
        accent: '#008080',
        primary: '#000000',
        secondary: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
