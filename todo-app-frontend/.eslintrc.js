module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      'jsx': true
    }
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
    browser: true,
  },
  ignorePatterns: [
    '.eslintrc.js', 
    'node_modules', 
    'build', 
    'dist', 
    'public'],
  rules: {
    'eqeqeq': 'error',
    'no-console': 'warn',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': 'error',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'warn'

  },
};
