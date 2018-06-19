const HtmlReporter = require('nightwatch-html-reporter');

const reporter = new HtmlReporter({
  openBrowser: false,
  hideSuccess: false,
  reportsDirectory: './functional_tests/reports',
  reportFilename: 'report_' + process.env.__NIGHTWATCH_ENV +'_.html',
  uniqueFilename: true,
  separateReportPerSuite: false
});


module.exports = {

  /* URL for the qmk SPA */
  launch_url:`https://config.qmk.fm/#/`,

  abortOnAssertionFailure: false,

  // this will overwrite the default polling interval (currently 500ms) for waitFor commands
  // and expect assertions that use retry
  waitForConditionPollInterval: 300,

  // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
  // expect assertions
  waitForConditionTimeout: 10000,

  beforeEach : function(browser,done){
    browser.resizeWindow(1920,1080,done);
  },
  afterEach : function(browser,done){
    browser.end();
    done();
  },
  reporter: reporter.fn
};
