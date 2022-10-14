/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    extend: {
      colors: {
        "app-bg-color": "#f3f4f6",
        viol: "#471F7A",
      },
    },
  },
  plugins: [],
};
