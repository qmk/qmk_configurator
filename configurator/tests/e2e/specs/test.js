// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.main')
      .assert.containsText('.topctrl-1-1', 'KEYBOARD:')
      .assert.containsText('.topctrl-2-1', 'LAYOUT:')
      .assert.containsText('.topctrl-1-2', 'KEYMAP NAME:')
      .assert.containsText('#load-default', 'LOAD DEFAULT')
      .assert.containsText('#compile', 'COMPILE')
      .end();
  }
};
