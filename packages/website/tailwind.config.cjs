/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'ger2-light': {
          primary: '#F564a9',
          secondary: '#9ACD32',
          accent: '#333574',
          neutral: '#d6d3d1',
          'base-100': '#f4f3f2',
          info: '#9CFFFA',
          success: '#04bf4c',
          warning: '#faac0a',
          error: '#c73e1d'
        }
      },
      {
        'ger2-dark': {
          primary: '#F564a9',
          secondary: '#9ACD32',
          accent: '#333574',
          neutral: '#292524',
          'base-100': '#121212',
          info: '#9CFFFA',
          success: '#04bf4c',
          warning: '#faac0a',
          error: '#c73e1d'
        }
      }
    ]
  }
}
