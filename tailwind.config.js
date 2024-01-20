/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors:{
        yellow:{
          50:"#F7CA00",
          40:"#ffdd45"
        }
      }
    },
  },
  plugins: [],
}

