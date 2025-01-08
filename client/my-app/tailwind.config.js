/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  "animation": {
    shimmer: "shimmer 2s linear infinite"
  },
  "keyframes": {
    shimmer: {
      from: {
        "backgroundPosition": "0 0"
      },
      to: {
        "backgroundPosition": "-200% 0"
      }
    }
  }
}
