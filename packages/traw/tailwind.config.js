/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'traw-purple': '#726EF6',
      },
      boxShadow: {
        '3xl': '0px 0px 60px 0px #bdbcf980',
      },
    },
  },
  plugins: [],
};
