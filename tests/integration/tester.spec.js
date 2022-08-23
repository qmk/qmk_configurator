import { cy, describe, before, it } from 'local-cypress';
describe('Tester feature', function () {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.visit('/#/test', {
      onBeforeLoad: (win) => {
        Object.defineProperty(win.navigator, 'language', {
          value: 'en-US'
        });
        Object.defineProperty(win.navigator, 'languages', {
          value: ['en-US']
        });
      }
    });
  });
  it('Tester should be accessible and instantiated', function () {
    cy.get('.visual-tester-keymap', { timeout: 4000 }).should('be.visible');
  });
  it('Should have an ANSI layout default', function () {
    // Ansi has 104 keys
    cy.get('.visual-tester-keymap').find('div').should('have.length', 104);
  });
  it('Should change layout', function () {
    // ISO has 105 keys
    cy.get('.bes-controls').click();
    cy.get('#setting-panel-os-keyboard-layout').select('keymap_uk');
    cy.get('.visual-tester-keymap').find('div').should('have.length', 105);
  });
  it('Handle typing', function () {
    cy.wait(2000); // wait for keyboard handler to take over body
    cy.get('body').trigger('keydown', { keyCode: 80, code: 'KeyP', key: 'p' });
    cy.get('.tester-key[title="P"]').should('have.class', 'active');
    cy.get('body').trigger('keyup', { keyCode: 80, code: 'KeyP', key: 'p' });
    cy.get('.tester-key[title="P"]').should('have.class', 'detected');
    cy.get('.letter-code').contains('KeyP');
    cy.get('.letter-key').contains('p');
    cy.get('.letter-key-code').contains('80');
    cy.get('.status-log').contains('KEY-DOWN');
    cy.get('.status-log').contains('KC_P');
    cy.get('.status-log').contains('p');
    cy.get('.status-log').contains('KeyP');
    cy.get('.status-log').contains('80');
    cy.get('.status-log').contains('KEY-UP');
  });
  it('Detects chatter', function () {
    cy.get('#chatter-threshold').clear().type('666');
    cy.get('body').click();
    cy.get('body').trigger('keydown', { keyCode: 80, code: 'KeyP', key: 'p' });
    cy.get('body').trigger('keyup', { keyCode: 80, code: 'KeyP', key: 'p' });
    cy.get('body').trigger('keydown', { keyCode: 80, code: 'KeyP', key: 'p' });
    cy.get('body').trigger('keyup', { keyCode: 80, code: 'KeyP', key: 'p' });
    cy.get('#chatter-alert').should('be.visible');
    cy.get('.tester-key[title="P"]').should('have.class', 'chatter-detected');
  });
});
