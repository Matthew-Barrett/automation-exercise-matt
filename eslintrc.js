module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
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
};