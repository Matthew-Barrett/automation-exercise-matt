import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";


// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  js.configs.recommended, // Base ESLint config

  compat.config({
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-unused-vars": ["error"],
      "no-console": ["warn"],
      "prefer-const": ["error"],
      "no-unreachable": ["error"],
      "no-empty-function": ["error"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "react/prop-types": ["error"],
      "react/no-array-index-key": ["warn"],
    },
  }),

  {
    files: ['*.ts'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
  },
]);
