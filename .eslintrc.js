module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['cypress'],
  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    'plugin:cypress/recommended'
  ],
  rules: {
    'cypress/no-unnecessary-waiting': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
