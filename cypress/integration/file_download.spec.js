import path from 'path';

describe('File download', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should download file', () => {
    cy.tid('download-file-button').click()
    const downloadsFolder = Cypress.config("downloadsFolder");
   cy.readFile(path.join(downloadsFolder, "sample.txt")).should("exist");

   cy.fixture('sample_download.txt').then((fileContent) => {
     cy.readFile(path.join(downloadsFolder, "sample.txt")).should("contain", fileContent);
   })
  })

})
