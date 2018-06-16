/**
 *  Test for the base page content and divs
 **/
'use strict';
module.exports = {
  'The backend status bar is displayed and has the required elements': function (browser) {
    let basePage = browser.page.qmkConfigBasePage();
    let statusBar = basePage.section.backend_status;
    basePage.navigate();
    statusBar.expect.element('@title').to.have.attribute('innerHTML').equals('Server Status:');
    statusBar.expect.element('@status').to.be.visible;
    statusBar.expect.element('@version').to.have.attribute('innerHTML').which.contains('API Version:');
    statusBar.expect.element('@runningJobs').to.have.attribute('innerHTML').which.contains('job(s) running');
  },
  'The page logo and title are present and link to the root': function (browser) {
    let basePage = browser.page.qmkConfigBasePage();
    basePage.navigate();
    basePage.expect.element('@pageHeader').to.have.attribute('href').equals('https://config.qmk.fm/');
    basePage.expect.element('@pageHeader').to.have.attribute('innerHTML').which.contains('QMK Configurator');
    basePage.expect.element('@headerIcon').to.be.visible;
  },
  'The footer contains a link to the QMK github': function(browser){
    let basePage = browser.page.qmkConfigBasePage();
    basePage.navigate();
    basePage.expect.element('@footerLink').to.have.attribute('href').equals('https://github.com/qmk')
  }
};
