/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        whiteGlow: [
          '0 0px 20px rgba(255, 255, 255, 0.35)',
          '0 0px 65px rgba(255, 255, 255, 0.2)',
        ],
        purpleGlow: [
          '0 0px 40px rgba(255, 0, 255, 0.35)',
          '0 0px 100px rgba(255, 0, 255, 0.2)',
        ],
      }
    },
  },
  plugins: [],
}
