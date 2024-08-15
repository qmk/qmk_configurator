const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: 'tests/fixtures',
  chromeWebSecurity: false,
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:5173/',
    specPattern: 'tests/integration/**/*.spec.js',
    supportFile: false,
  },
  component: {
    setupNodeEvents(on, config) {},
    specPattern: 'src/**/*.spec.js',
  },
})
