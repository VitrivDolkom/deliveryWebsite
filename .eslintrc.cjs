module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // error on nested ternary
    'no-nested-ternary': 'error',
    // () => { return smth } -> () => smth
    'arrow-body-style': ['warn', 'as-needed'],
    // warn console, debugger
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-inline-comments': 'warn',
    // warn extra spaces
    'no-trailing-spaces': 'warn',
    // configure quotes
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    // use const instead of let if its possible
    'prefer-const': 'error',
    // spaces per tab
    indent: ['warn', 2],
    // configure semi
    semi: 'off',
    // max length per line
    'max-len': ['warn', 105],
    // extra comma in object
    'comma-dangle': ['error', 'never'],
    // round brackets with one function param
    'arrow-parens': ['error', 'always'],
    // error on duplicate import
    'no-duplicate-imports': 'error',
    'import/no-internal-modules': ['off'],
    // allow double negation
    'no-extra-boolean-cast': 'off',
    'react-hooks/exhaustive-deps': 'off'
  }
}
