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


Cypress.Commands.add('setup', (query = '') => cy.request(`http://127.0.0.1:4000/seed?${query}`))
Cypress.Commands.add('tid', (selector) => cy.get(`[data-testid="${selector}"]`))
Cypress.Commands.add('tide', (selector) => cy.get(`[data-testid^="${selector}"]`))
Cypress.Commands.add('input', (selector) => cy.get(`[name="${selector}"]`))
Cypress.Commands.add('typeText', { prevSubject: true }, (subject, itemText, { clear, enter, delay = 10, blur } = {}) => {
  if (clear) {
    cy.wrap(subject).clear()
  }

  cy.wrap(subject).type(itemText + (enter ? '{enter}' : ''), { delay })

  if (blur) {
    cy.wrap(subject).blur()
  }
})


Cypress.Commands.add('assignFile', { prevSubject: true }, (subject, {fixture, contentType}) => {
  cy.fixture(fixture).as('uploadingFile');
  // eslint-disable-next-line func-names
  cy.wrap(subject).then(function(el) {
    // convert the uploadingFile base64 string to a blob
    const blob = contentType.startsWith('text') ? new Blob([this.uploadingFile], { type: contentType}) : Cypress.Blob.base64StringToBlob(this.uploadingFile, contentType);

    // eslint-disable-next-line no-undef
    const file = new File([blob], fixture, {
      type: contentType,
    });
    // eslint-disable-next-line no-undef
    const list = new DataTransfer();

    list.items.add(file);
    const myFileList = list.files;

    // eslint-disable-next-line no-param-reassign
    el[0].files = myFileList;
    // eslint-disable-next-line no-undef
    el[0].dispatchEvent(new Event('change', { bubbles: true }));
  });
})
