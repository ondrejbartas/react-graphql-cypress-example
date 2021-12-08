describe('File upload', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should assign file to file input', () => {
    cy.input('file_upload').assignFile({fixture: 'sample.csv', contentType: 'text/csv'})
    cy.tid('selected-file').should('contain', 'sample.csv')
    cy.tid('selected-file').should('contain', 'text/csv')
    cy.tid('selected-file').should('contain', '20')

    cy.input('file_upload').assignFile({fixture: 'sample2.csv', contentType: 'text/csv'})
    cy.tid('selected-file').should('contain', 'sample2.csv')
    cy.tid('selected-file').should('contain', 'text/csv')
    cy.tid('selected-file').should('contain', '29')

    cy.input('file_upload').assignFile({fixture: 'logo.png', contentType: 'image/png'})
    cy.tid('selected-file').should('contain', 'logo.png')
    cy.tid('selected-file').should('contain', 'image/png')
    cy.tid('selected-file').should('contain', '43271')
    cy.tid('selected-file').find('img').should('exist')
  })

})
