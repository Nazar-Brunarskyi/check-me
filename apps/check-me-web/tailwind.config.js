const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const themeConfig = require('../../libs/angular-theme/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {},
  },
  presets: [themeConfig],
};
