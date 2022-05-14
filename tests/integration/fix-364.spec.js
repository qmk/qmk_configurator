import { cy, describe, before, it } from 'local-cypress';

describe('Issue #364', function () {
  before(() => {
    cy.viewport('macbook-15');
  });

  beforeEach(() => {
    cy.visit('/#/dz60/LAYOUT');

    cy.intercept('POST', 'https://api.qmk.fm/v1/compile', { fixture: '364-first-step.json' });
    cy.intercept('GET', 'https://api.qmk.fm/v1/compile/ea1514b3-bdfc-4a7b-9b5c-08752684f7f6', 
      { fixture: '364-second-step.json' });
  });

  it('"download firmware" button should be enabled after pressing compile', function () {
    cy.wait(1000);

    cy.get('#compile', { timeout: 5000 }).click();

    cy.get('#fwFile', { timeout: 1000 }).should('be.enabled');
    cy.get('#source', { timeout: 1000 }).should('be.enabled');
  });


  it('"download firmware" button should be enabled after pressing compile, going to "print mode" and back', function () {
    cy.wait(1000);

    cy.get('#compile', { timeout: 5000 }).click();
    cy.wait(1000);

    cy.get('#printkeymaps').click();

    cy.get('#leavePrint', { timeout: 1000 }).click();
    cy.wait(1000);

    cy.get('#fwFile', { timeout: 1000 }).should('be.enabled');
    cy.get('#source', { timeout: 1000 }).should('be.enabled');
  });

  it('"download" should be disabled after compiling and changing keyboard', function () {
    cy.wait(1000);

    cy.get('#compile', { timeout: 5000 }).click();
    cy.wait(1000);

    cy.get('#fwFile', { timeout: 1000 }).should('be.enabled');
    cy.get('#source', { timeout: 1000 }).should('be.enabled');

    cy.get('.v-select.vs--single.vs--searchable').click();
    cy.get('.vs__search').type('planck{enter}');
    cy.wait(1000);

    cy.get('#fwFile', { timeout: 1000 }).should('be.disabled');
    cy.get('#source', { timeout: 1000 }).should('be.disabled');
  });
});
