describe('Visit another site', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should get there', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://www.google.com'
    }).as('visitGoogle')

    cy.tid('go-to-google').click()

    cy.wait('@visitGoogle')
    cy.url().should('contain', 'https://www.google.com')
  })

})
