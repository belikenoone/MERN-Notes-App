/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-dark": "#353535",
        "off-white": "#d9d9d9",
        "just-white": "#ffffff",
        "matte-blue": "#3c6e71",
        "dark-blue": "#284b63",
      },
    },
  },
  plugins: [],
};
