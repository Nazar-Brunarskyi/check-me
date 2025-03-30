const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const PrimeUI = require('tailwindcss-primeui');
const { getTailwindColors } = require('./src/theme/get-tailwind-colors');
const { colorsArray } = require('./src/theme/colors-array');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      colors: {
        ...getTailwindColors(colorsArray),
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [PrimeUI],
};
