/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        yellow: {
          50: "#fad11b",
          40: "#ffdd45"
        },
        green: {
          50: "#66f542",
          40: "#94fc79"
        },
        blue: {
          50: "#4784ff",
          40: "#6a9bfc"
        }
      }
    },
  },
  plugins: [],
})

