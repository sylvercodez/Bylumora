/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#facc15",
        dark: "#0a0a0a",
        surface: "rgba(255,255,255,0.05)",
      },
      boxShadow: {
        glow: "0 0 15px rgba(250, 204, 21, 0.4)",
      },
      backdropBlur: {
        glass: "20px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
