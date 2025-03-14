import nx from '@nx/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    plugins: {
      'unused-imports': unusedImports,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      'unused-imports/no-unused-vars': ['warn'],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'scope:models',
              onlyDependOnLibsWithTags: ['scope:models'],
            },
            {
              sourceTag: 'scope:angular-theme',
              onlyDependOnLibsWithTags: ['scope:angular-theme', 'scope:models'],
            },
            {
              sourceTag: 'scope:check-me-web',
              onlyDependOnLibsWithTags: ['scope:check-me-web', 'scope:angular-theme', 'scope:models'],
            },
            {
              sourceTag: 'scope:check-me-api',
              onlyDependOnLibsWithTags: ['scope:check-me-api', 'scope:models'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    // Override or add rules here
    rules: {},
  },
];
