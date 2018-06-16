/**
 *  Test for the base page content and divs
 **/
'use strict';
module.exports = {
  'The page logo and title are present and link to the root': function (browser) {
    let basePage = browser.page.qmkConfigBasePage();
    basePage.navigate();
    basePage.expect.element('h1 a').to.have.attribute('innerHTML').which.contains('QMK Configurator');
  },
};
