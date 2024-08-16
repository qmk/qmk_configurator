const cypress = require('eslint-plugin-cypress');
const eslintPluginVue = require('eslint-plugin-vue');
const cypressConfig = require('./cypress.config');
module.exports = [
  ...eslintPluginVue.configs['flat/vue2-essential'],
  {
    plugins: {
      cypress: cypress
    },
    rules: {
      'cypress/no-unnecessary-waiting': 'off',
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'comma-dangle': ['error', 'never'],
      // this rule is incompatible with vue 2
      // @see https://eslint.vuejs.org/rules/no-v-for-template-key-on-child.html
      'vue/no-v-for-template-key-on-child': 'off'
    }
  }
];
