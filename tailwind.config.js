module.exports = {
  purge: ["./**/*.jsx", "./**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
      },
      strokeWidth: {
        3: "3",
        4: "4",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
