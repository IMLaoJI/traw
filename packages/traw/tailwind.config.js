/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        traw: {
          "purple-light": "#ACAAFF",
          purple: "#726EF6", //primary.main
          sky: "#E6EBFC", //divider
          pink: "#E983B2", //secondary.main
          "grey-50": "#DEDEE9",
          "grey-100": "#9B9EB5", //neutral.main
          "grey-200": "#8E93B8",
          grey: "#5B5F80", //text.secondary
          "grey-dark": "#2B2B59", //text.primary
        },
      },
      boxShadow: {
        "3xl": "0px 0px 60px 0px #bdbcf980",
      },
    },
  },
  plugins: [],
};
