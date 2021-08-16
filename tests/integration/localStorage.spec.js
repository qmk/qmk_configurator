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
  it('Should load darkmode from localstorage', () => {
    cy.clearLocalStorage();
    cy.visit('/', {
      onBeforeLoad: (contentWindow) => {
        contentWindow.localStorage.setItem(
          'configuratorSettings',
          JSON.stringify({
            darkmodeEnabled: true,
            favoriteKeyboard: '',
            version: 1
          })
        );
      }
    });
    cy.get('.bes-controls').click();
    cy.get('html[data-theme="dark"]', { timeout: 5000 }).should('be.visible');
  });
  it('Should set darkmode localstorage and reload it', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        // force false, even if OS has requested change
        cy.stub(win, 'matchMedia')
          .withArgs('(prefers-color-scheme: dark)')
          .returns({
            matches: false
          });
      }
    });
    cy.clearLocalStorage();
    cy.get('html[data-theme="dark"]', { timeout: 5000 }).should(
      'not.be.visible'
    );
    cy.get('.bes-controls', { timeout: 5000 }).click();
    cy.get('#setting-toggle-darkmode').click();
    cy.get('html[data-theme="dark"]', { timeout: 5000 }).should('be.visible');
    cy.visit('/');
    cy.get('html[data-theme="dark"]', { timeout: 5000 }).should('be.visible');
  });
  it('Should load favorite keyboard from localstorage', () => {
    cy.clearLocalStorage();
    cy.visit('/', {
      onBeforeLoad: (contentWindow) => {
        contentWindow.localStorage.setItem(
          'configuratorSettings',
          JSON.stringify({
            darkmodeEnabled: false,
            favoriteKeyboard: '1upkeyboards/super16',
            version: 1
          })
        );
      }
    });
    cy.get('.vs__selected', { timeout: 5000 }).should('be.visible');
    cy.get('.vs__selected', { timeout: 5000 }).contains('1upkeyboards/super16');
  });
  it('Should set favorite keyboard to localstorage and reload it', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.get('.vs__selected', { timeout: 10000 }).should('be.visible');
    cy.get('.vs__selected').click();
    cy.get('.vs__search').type('2_milk');
    cy.get('.vs__dropdown-option.vs__dropdown-option--highlight').click();
    cy.get('.vs__selected', { timeout: 5000 }).contains('2_milk');
    cy.get('#favorite-keyboard').click();
    cy.visit('/');
    cy.get('.vs__selected', { timeout: 5000 }).should('be.visible');
    cy.get('.vs__selected', { timeout: 5000 }).contains('2_milk');
    cy.get('#favorite-keyboard').should('have.class', 'active');
  });
  it('Should change language, set to localstorage and retrieve it', () => {
    cy.clearLocalStorage();
    cy.visit('/', {
      onBeforeLoad: (win) => {
        Object.defineProperty(win.navigator, 'language', {
          value: 'en-US'
        });
        Object.defineProperty(win.navigator, 'languages', {
          value: ['en-US']
        });
      }
    });
    cy.get('#drop-label-keyboard', { timeout: 10000 }).contains('keyboard');
    cy.get('.bes-controls').click();
    cy.get('.settings-panel', { timeout: 5000 }).should('be.visible');
    cy.get('#setting-panel-language').select('fr');
    cy.get('.slideout-panel-bg').click();
    cy.get('#drop-label-keyboard', { timeout: 10000 }).contains('clavier');
    cy.visit('/', {
      onBeforeLoad: (win) => {
        Object.defineProperty(win.navigator, 'language', {
          value: 'en-US'
        });
        Object.defineProperty(win.navigator, 'languages', {
          value: ['en-US']
        });
      }
    });
    cy.get('#drop-label-keyboard', { timeout: 10000 }).contains('clavier');
  });
});
