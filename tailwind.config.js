/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      handset: { max: '800px' },
      desktop: '801px'
    },
    fontFamily: {
      'scripty': ['Satisfy'],
      'default': ['Comfortaa']
    },
    extend: {
      transitionProperty: {
        'maxHeight': 'max-height'
      }
    }
  },
  plugins: [],
}
