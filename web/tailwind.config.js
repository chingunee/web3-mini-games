/** @type {import('tailwindcss').Config} */ 
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '7rem',
      },
    },
    extend: {
      fontFamily: {
        body: ['Rajdhani']
      },
      animation: {
        'bounce-slow': 'bounce 5s linear infinite',
      },
    },
  },
  plugins: [],
}
