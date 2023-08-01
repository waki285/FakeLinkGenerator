/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/js/**/*.tsx"],
  jit: true,
  darkMode: "class",
  theme: {
    extend: {
      height: {
        "dscreen": "100dvh",
      },
    },
    fontFamily: {
      serif: ["Lora", '"Kiwi Maru"', "serif"],
      sans: ['Lato', '"M PLUS 1"', "sans-serif"],
      title: ['"Abril Fatface"', '"Zen Antique Soft"', "cursive", "sans-serif"],
    },
    screens: {
      "pc": "700px"
    }
  },
  plugins: [],
}
