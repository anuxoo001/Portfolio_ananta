/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        neon: "0 0 24px rgba(0,255,255,0.35)",
      },
      colors: {
        neon: {
          cyan: "#00ffff",
          magenta: "#ff2bd6",
          lime: "#a6ff00",
        },
      },
    },
  },
  plugins: [],
};

