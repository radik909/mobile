/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['HelveticaNeue', 'sans-serif'],
        helveticaMedium: ['HelveticaNeueMedium', 'sans-serif'],
        digit: ['Digit', 'monospace'],
        riyal: ['SaudiRiyal', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
