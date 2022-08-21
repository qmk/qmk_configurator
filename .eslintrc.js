module.exports = {
  root: true,
  env: {
    es2021: true
  },
  plugins: ['cypress'],
  extends: [
    'plugin:vue/recommended',
    '@vue/prettier',
    'plugin:cypress/recommended'
  ],
  rules: {
    'cypress/no-unnecessary-waiting': 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'never'],
    // this rule is incompatible with vue 2
    // @see https://eslint.vuejs.org/rules/no-v-for-template-key-on-child.html
    'vue/no-v-for-template-key-on-child': 'off'
  }
};
