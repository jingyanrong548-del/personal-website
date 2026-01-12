/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,html}",
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#10B981',
        'green-dark': '#059669',
        'green-light': '#34D399',
        'warm-orange': '#10B981',
        'warm-orange-light': '#34D399',
      },
    },
  },
  plugins: [],
}
