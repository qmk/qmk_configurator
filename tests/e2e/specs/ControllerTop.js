// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'controller top tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .assert.containsText('.topctrl-keyboards', 'KEYBOARD:')
      .assert.containsText('.topctrl-layouts', 'LAYOUT:')
      .assert.containsText('.topctrl-keymap-name', 'KEYMAP NAME:')
      .assert.containsText('.topctrl-controls', 'LOAD DEFAULT')
      .assert.containsText('#compile', 'COMPILE')
      .end();
  }
};
