const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },

      maxWidth: {
        '2xl': '40rem',
      },
      boxShadow: {
        '3xl': '3px -5px 20px #9A9A9A29',
        '4xl': '0px 10px 60px #DCDCDC8C',
      },
      colors: {
        primary: '#3D897A',
        black: '#232323',
      },
      fontFamily: {
        urban: ['Urbanist', ' sans-serif'],
      },  keyframes: {
        ShoppingCart: {
          '0%': { transform: 'rotate(0deg) translateX(0rem)' },
          '1%':{transform: 'rotateY(180deg)   '},
          '15%':{transform: 'rotateY(180deg)  rotate(-45deg) '},
          '50%': { transform: ' translateX(-10rem) rotate(0deg) ' },
          '65%':{ transform: ' rotate(-50deg) ' },
          '100%': { transform: 'translateX(0rem) rotate(0deg)'  },
        }
      }, 
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    

  ],
}
