/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/vue-tailwind-datepicker/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // "vtd-primary": colors.sky,
        // "vtd-secondary": colors.gray,
        "vtd-primary": colors.indigo,
        "vtd-secondary": colors.white,
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        move: {
          'from': { transform: 'translateX(50px)', opacity: 0, },
          'to': { transform: 'translateX(0px)', opacity: 1, },
        },
      },
      // keyframes: {
      //   scale: {
      //     'from': {}
      //   }
      // },
      animation: {
        moving: 'move 0.5s',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // '~/plugins/vue-tailwind-datepicker.js',
  ],
}