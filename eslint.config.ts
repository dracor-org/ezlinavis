import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}']},
  {languageOptions: {globals: {...globals.browser, ...globals.node}}},
  {ignores: ['src/grammar.js', 'grammar.js', 'build/**']},
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  pluginReactHooks.configs.flat['recommended-latest'],
  eslintPluginPrettierRecommended,
  {
    rules: {
      camelcase: 'warn',
      'no-console': 'warn',
      'spaced-comment': ['error', 'always'],
      'react/jsx-uses-vars': 1,
    },
  }
);
