/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1020",
        panel: "#11182A",
        elevated: "#182238",
        accent: "#7165F5",
        aqua: "#38D9D0",
        paper: "#F7F8FC",
        muted: "#8A94A9"
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 32px rgba(113,101,245,.22)"
      }
    }
  },
  plugins: []
};