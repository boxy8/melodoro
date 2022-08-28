/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './pages/login.js',
  ],
  theme: {
    colors: {
      'black': '#121212',
      'purple-dark': '#e0cee7',
      'purple-light': '#e9dfec',
    },
    extend: {
      fontFamily: {
        'cabin': ['Cabin', 'sans-serif'],
        'bellota': ['Bellota Text', 'cursive'],
      },
    },
  },
  plugins: [],
}
