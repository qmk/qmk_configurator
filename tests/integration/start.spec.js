describe('Simple browsing', function () {
  before(() => {
    cy.viewport('macbook-15');
    cy.server();
    cy.route('https://api.qmk.fm/v1/keyboards', [
      '1upkeyboards/1up60hse',
      '1upkeyboards/1up60hte',
      '1upkeyboards/1up60rgb',
      '1upkeyboards/super16',
      '1upkeyboards/sweet16',
      '2_milk',
      '30wer'
    ]);
  });
  beforeEach(() => {
    cy.visit('/');
  });
  it('Top Controller should be instantiated and visible', function () {
    cy.get('#controller-top').should('be.visible');
  });
  it('Visual Keymap should be visible', function () {
    cy.get('#visual-keymap').should('be.visible');
  });
  it('Terminal should be visible', function () {
    cy.get('#status').should('be.visible');
  });
  it('Keycode section should be present', function () {
    cy.get('#keycodes-section').should('be.visible');
  });
  it('Side panel should display and disappear properly', function () {
    cy.get('.bes-controls').click();
    cy.get('.settings-panel', { timeout: 5000 }).should('be.visible');
    cy.get('.slideout-panel-bg').click();
  });
  it('Tester should be accessible and instantiated', function () {
    cy.wait(1000);
    cy.get('#testkeys').click();
    cy.get('.visual-tester-keymap', { timeout: 5000 }).should('be.visible');
  });
});
