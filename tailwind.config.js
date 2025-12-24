/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        safehandsLight: {
          primary: '#003060',
          secondary: '#055C9D',
          accent: '#0E86D4',
          info: '#68BBE3',

          neutral: '#0B1F33',
          'base-100': '#FFFFFF',
          'base-200': '#F3F8FD',
          'base-300': '#E5F0FA',
          'base-content': '#0B1F33',

          success: '#16A34A',
          warning: '#F59E0B',
          error: '#DC2626',
        },
      },
      {
        safehandsDark: {
          primary: '#0E86D4',
          secondary: '#68BBE3',
          accent: '#055C9D',
          info: '#68BBE3',

          neutral: '#003060',
          'base-100': '#071723',
          'base-200': '#06131D',
          'base-300': '#050F17',
          'base-content': '#EAF6FF',

          success: '#22C55E',
          warning: '#FBBF24',
          error: '#EF4444',
        },
      },
    ],
    darkTheme: 'safehandsDark',
  },
}
