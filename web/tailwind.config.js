/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFDFC',
        ivory: '#FAF6EE',
        blush: {
          50: '#FBF1F3',
          100: '#F7EBEE',
          200: '#F8D8DC',
          300: '#E2C6CD',
          400: '#CC9FAC',
          500: '#C98F9F',
        },
        cream: {
          50: '#FFFDF7',
          100: '#F7F0E7',
          200: '#F5EDD8',
          300: '#EDE2CE',
        },
        gold: {
          300: '#E4D69A',
          400: '#C4B47B',
          500: '#B8965A',
          600: '#AA954B',
        },
        espresso: {
          700: '#7A6145',
          800: '#3C2A12',
          900: '#2A2318',
        },
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', '"Cinzel"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Poppins"', '"Tenor Sans"', 'system-ui', 'sans-serif'],
        tenor: ['"Tenor Sans"', 'system-ui', 'sans-serif'],
        sinhala: ['"Noto Serif Sinhala"', '"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        editorial: '0 20px 50px rgba(122, 97, 69, 0.15)',
        soft: '0 10px 30px rgba(122, 97, 69, 0.08)',
        card: '0 8px 24px rgba(122, 97, 69, 0.07)',
      },
    },
  },
  plugins: [],
};
