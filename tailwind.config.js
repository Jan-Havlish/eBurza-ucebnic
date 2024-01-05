/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        agBlue: "#001839",
        agRed: "#E11920",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
