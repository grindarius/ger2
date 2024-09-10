/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'ger2-dark': {
          primary: '#1e96fc',
          'primary-content': '#eeeeee',
          secondary: '#6ee3bb',
          'secondary-content': '#0e1b12',
          accent: '#924fbe',
          'accent-content': '#eee',
          neutral: '#e3e1e1',
          'neutral-content': '#292626',
          'base-100': '#131313',
          'base-200': '#2b2b2b',
          'base-300': '#454545',
          'base-content': '#e7e7e7',
          info: '#17bbb3',
          'info-content': '#0e1b12',
          success: '#8bc34a',
          'success-content': '#0e1b12',
          warning: '#ffc107',
          'warning-content': '#1f1f1f',
          error: '#b10303',
          'error-content': 'f7f7f7'
        }
      },
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
      }
    ]
  }
}
