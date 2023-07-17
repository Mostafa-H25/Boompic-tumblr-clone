/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/app/**/*.{html,js}"],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    extend: {
      screens: {
        "3xl": "1624px",
      },
      backgroundImage: {
        search: "url('/assets/images/backgroundIcons/search.png')",
      },
    },
  },
  plugins: [],
};
