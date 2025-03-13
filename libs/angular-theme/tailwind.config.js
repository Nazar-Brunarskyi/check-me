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
  },
  plugins: [PrimeUI],
};
