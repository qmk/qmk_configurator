describe('Simple browsing', function() {
  beforeEach(() => {
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
  it('Starts the app Check the dom', function() {
    cy.visit('/');
    cy.get('#controller-top').should('be.visible');
    cy.get('#visual-keymap').should('be.visible');
    cy.get('#status').should('be.visible');
    cy.get('#keycodes-section').should('be.visible');
    cy.get('.openSettings').click();
    cy.get('.settings-panel', { timeout: 5000 }).should('be.visible');
    cy.get('.slideout-panel-bg').click();
    cy.get('#testkeys').click();
    cy.get('.visual-tester-keymap').should('be.visible');
  });
});
