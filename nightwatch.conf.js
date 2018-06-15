nightwatch_config = {
  src_folders: [
    './functional_tests/tests'
  ],
  output_folder: './functional_tests/reports',
  page_objects_path: './functional_tests/pageobjects',
  globals_path: 'functional_tests/globals.js',
  selenium: {
    start_process: false,
    host: 'localhost',
    port: 4444,
    server_path:'./functional_tests/bin/selenium-server-standalone-3.12.0.jar',
    cli_args:{
      'webdriver.gecko.driver': './functional_tests/bin/geckodriver',
      'webdriver.chrome.driver': './functional_tests/bin/chromedriver'
    }

  },

  common_capabilities: {
    javascriptEnabled: true
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
      }
    },
    chromeHeadless: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions:{
          args:[
            'headless',
            'disable-gpu',
            'window-size=1920,1080'
          ]
        }
      }
    },
    firefoxHeadless: {
        desiredCapabilities: {
          browserName: 'firefox',
          firefoxOptions:{
            args:[
              'headless',
              'window-size=1920,1080'
            ]
          }
      }
    }
  }
};
/* Code to use common_capabilities shared across profiles */
for (let i in nightwatch_config.test_settings) {
  let config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for (let j in nightwatch_config.common_capabilities) {
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nightwatch_config.common_capabilities[j];
  }
}
module.exports = nightwatch_config;
