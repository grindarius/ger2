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
        ger2: {
          primary: '#8457d1',
          secondary: '#0b0514',
          accent: '#6131b4',
          'base-100': '#090410',
          neutral: '#2d1452'
        }
      }
    ]
  }
}
