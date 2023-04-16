/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'amaranth': '#e63946',
        'panache': '#f1faee',
        'charlotte': '#a8dadc',
        'jellybean': '#457b9d',
        'catalina': '#1d3557',

        'blancb': '#e7ecef',
        'blauf': '#274c77',
        'blaum': '#6096ba',
        'blauc': '#a3cef1',
        'grisb': '#8b8c89'

      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')
,require('@tailwindcss/forms')
,require('@tailwindcss/line-clamp')
,require('@tailwindcss/typography')
],
};
