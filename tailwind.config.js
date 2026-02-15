/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,html}",
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#6BA47A',
        'green-dark': '#5A8F6B',
        'green-light': '#7AB089',
        'warm-orange': '#6BA47A',
        'warm-orange-light': '#7AB089',
      },
    },
  },
  plugins: [],
}
