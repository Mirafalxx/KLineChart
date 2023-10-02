module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  extends: 'standard-with-typescript',
  plugins: ['@typescript-eslint'],
  overrides: [],
  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off'
  }
}
