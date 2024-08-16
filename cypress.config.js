const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: 'tests/fixtures',
  chromeWebSecurity: false,
  video: false,
  e2e: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    },
    baseUrl: 'http://localhost:5173/',
    specPattern: 'tests/integration/**/*.spec.js',
    supportFile: false
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    },
    specPattern: 'src/**/*.spec.js',
    supportFile: false
  }
});
