import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  { ignores: ['src/grammar.js', 'grammar.js', 'src/App.test.jsx'] },
  pluginJs.configs.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  eslintPluginPrettierRecommended,
  {
    rules: {
      camelcase: 'warn',
      'no-console': 'warn',
      'spaced-comment': ['error', 'always'],
      'react/jsx-uses-vars': 1,
    },
  },
];
