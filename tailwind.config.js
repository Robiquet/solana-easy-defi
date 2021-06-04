module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "light-red": "#FEEAEF",
        "light-green": "#EAFEF4",
        "light-purple": "#EDEAFE",
        cyan: "#1DA1F2",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
