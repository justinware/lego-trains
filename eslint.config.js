import jsLint from '@eslint/js';
import globals from 'globals';
import tsLint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

const ALWAYS = 'always'
const ERROR = 'error';
const NEVER = 'never';
const OFF = 'off';

export default tsLint.config({
  extends: [
    jsLint.configs.recommended,
    ...tsLint.configs.recommended,
    ...tsLint.configs.strict,
    ...tsLint.configs.stylistic,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
  ],
  files: ['src/**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    sourceType: 'module',
    globals: globals.browser,
  },
  plugins: {},
  rules: {
    // TypeScript
    // ----------
    '@typescript-eslint/consistent-type-definitions': OFF,
    '@typescript-eslint/no-unused-vars': OFF,

    // Import
    // ------
    'import/extensions': [
      ERROR,
      NEVER,
      {
        css: ALWAYS,
        json: ALWAYS,
      },
    ],
    'import/order': [
      ERROR,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
          'object',
          'type',
        ],
        'newlines-between': ALWAYS,
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-extraneous-dependencies': [ERROR],
    'import/no-cycle': [ERROR],
    'import/no-useless-path-segments': [ERROR],
    'import/no-duplicates': [ERROR]
  }
});
