/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        'xs': '475px',
        '2xl': '1480px',
      },
    },
  },
  plugins: [],
}

