// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')


Cypress.Commands.add('tid', (selector) => cy.get(`[data-testid="${selector}"]`))
Cypress.Commands.add('input', (selector) => cy.get(`[name="${selector}"]`))
Cypress.Commands.add('typeText', { prevSubject: true }, (subject, itemText, { clear, enter, delay = 1, blur } = {}) => {
  if (clear) {
    cy.wrap(subject).clear()
  }

  cy.wrap(subject).type(itemText + (enter ? '{enter}' : ''), { delay })

  if (blur) {
    cy.wrap(subject).blur()
  }
})
