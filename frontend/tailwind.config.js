/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out', // Custom fade-in animation
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },  // Starts at 0 opacity (invisible)
          '100%': { opacity: 1 }, // Ends at full opacity (fully visible)
        },
      },
    },
    container: {
      padding: {
        md: "10rem",
      },
    },
  },
  plugins: [],
};
