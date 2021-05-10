module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['cypress'],
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/prettier',
    'plugin:cypress/recommended'
  ],
  rules: {
    'cypress/no-unnecessary-waiting': 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
