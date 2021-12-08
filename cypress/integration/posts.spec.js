describe('Posts', () => {
  beforeEach(() => {
    cy.request('http://127.0.0.1:4000/seed')
  })
  it('should create post by save button', () => {
    cy.visit('/')
    cy.tid('post-new-button').click()
    cy.input('author').typeText('Foo Bar')
    cy.input('body').typeText('Some post')
    cy.tid('post-save-button').click()
    cy.tid('post-table-author').should('contain', 'Foo Bar')
    cy.tid('post-table-body').should('contain', 'Some post')
  })

  it('should create another post by enter', () => {
    cy.visit('/')
    cy.tid('post-new-button').click()
    cy.input('author').typeText('Other Foo Bar')
    cy.input('body').typeText('Some other post', {enter: true})
    cy.tid('post-table-author').should('contain', 'Other Foo Bar')
    cy.tid('post-table-body').should('contain', 'Some other post')
  })
})
