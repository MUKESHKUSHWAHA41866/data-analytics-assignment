/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(102 126 234 / <alpha-value>)',
        secondary: 'rgb(118 75 162 / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
