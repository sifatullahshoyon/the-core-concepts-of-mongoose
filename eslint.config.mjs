import globals from 'globals';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   {
//     ignores: ["node_modules", "dist"],
//     rules: {
//       "no-unused-vars": "error",
//       "no-unused-expressions": "error",
//       "prefer-const" : "error",
//       "no-console": "warn",
//       "no-undef" : "error"
//     },
//     "globals" : {
//       "process": "readonly",
//     },
//   },

// ];

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser: tsParser, // Use the TypeScript parser for parsing TypeScript files
      globals: {
        ...globals.browser,
        process: 'readonly', // Add global `process`
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
      ...js.configs.recommended.rules, // Include JavaScript recommended rules
      ...tsPlugin.configs.recommended.rules, // Include TypeScript recommended rules
    },
  },
];
