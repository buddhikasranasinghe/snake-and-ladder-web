/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'play': ["Play", 'sans-serif']
      },
      backgroundColor: {
        'primary': '#222629',
        'gray-primary': '#474B4F',
        'gray-secondary': '#6B6E70',
        'green-primary': '#61892F',
        'green-secondary': '#86C232'
      },
      textColor: {
        'green-primary': '#61892F',
        'green-secondary': '#86C232'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

