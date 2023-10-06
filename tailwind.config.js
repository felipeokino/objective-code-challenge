/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'flipCard': {
          '0%': {
            // 'transformStyle': 'preserve-3d',
            // 'backfaceVisibility': 'hidden',
            clipPath: 'circle(75%)',
            
          },
          '100%': {
            // transform: 'rotateY(180deg)',
            transition: 'all .5s cubic-bezier(.8,.5,.2,1.4)',
    boxShadow: '0px 2px 3px rgba(0,0,0,.3)',
    transform: 'scale(.97)',
            'transform-style': 'preserve-3d',
            
            'backfaceVisibility': 'hidden',
          }
        }
      },
      animation: {
        flipCard: 'flipCard .5s ease-in-out forwards',

      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.utilArea': {
          'height': 'calc(100vh - 9rem)',
          'marginTop': '6rem',
          'padding': '2rem'
        },
        '.clipPath': {
          'clipPath': 'circle(0% at 100% 100%)'
        },
        '.cardAnimated': {
          'transition':' all .5s cubic-bezier(.8,.5,.2,1.4)',
          'boxShadow':' 0px 2px 3px rgba(0,0,0,.3)',
          'transform':' scale(.97)',
        },
        '.cardHover': {
          'left':'0px',
          'transition':'all .7s ease-in-out',
          'clipPath':'circle(75%)',
        }
      };
      addUtilities(newUtilities);
    }),
  ],
}

