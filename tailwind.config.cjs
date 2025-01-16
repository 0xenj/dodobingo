const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        luciole: ['luciole', 'sans-serif'],
        obviously: ['obviously', 'sans-serif'],
        roboto: ['roboto', 'sans-serif'],
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': {
          fontFamily: 'luciole',
          src: `url('/fonts/Luciole-Regular.ttf') format('truetype')`,
          fontWeight: 'normal',
          fontStyle: 'normal',
        },
      });
      addBase({
        '@font-face': {
          fontFamily: 'obviously',
          src: `url('/fonts/Obviously-Wide-Semibold.ttf') format('truetype')`,
          fontWeight: 'normal',
          fontStyle: 'normal',
        },
      });
      addBase({
        '@font-face': {
          fontFamily: 'roboto',
          src: `url('/fonts/Roboto-Medium.ttf') format('truetype')`,
          fontWeight: 'normal',
          fontStyle: 'normal',
        },
      });
    }
   )
  ],
 }
}

