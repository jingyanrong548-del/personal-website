/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,html}",
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#2E7D32',
        'green-dark': '#1B5E20',
        'green-light': '#43A047',
        'warm-orange': '#2E7D32',
        'warm-orange-light': '#43A047',
      },
    },
  },
  plugins: [],
}
