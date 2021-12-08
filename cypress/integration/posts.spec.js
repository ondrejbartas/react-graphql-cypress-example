import { fillAndSavePost, editPost } from '../page_objects/post';

describe('Posts', () => {
  beforeEach(() => {
    cy.setup()
    cy.visit('/')
  })

  it('should create post by save button', () => {
    cy.tid('post-new-button').click()
    cy.input('author').typeText('Foo Bar')
    cy.input('body').typeText('Some post')
    cy.tid('post-save-button').click()
    cy.tid('post-table-author').should('contain', 'Foo Bar')
    cy.tid('post-table-body').should('contain', 'Some post')
  })

  it('should create another post by enter', () => {
    cy.tid('post-new-button').click()
    cy.input('author').typeText('Other Foo Bar')
    cy.input('body').typeText('Some other post', {enter: true})
    cy.tid('post-table-author').should('contain', 'Other Foo Bar')
    cy.tid('post-table-body').should('contain', 'Some other post')
  })

  it('should create another post by page object', () => {
    cy.tid('post-new-button').click()
    fillAndSavePost({
      author: 'Other Foo Bar',
      body: 'Some by post object',
    })
  })

  it('should edit existing post', () => {
    let counter = 1
    editPost({body: 'Hello world'})
    fillAndSavePost({
      body: `Hello world - ${counter}`,
    })

    counter += 1

    editPost({body: 'Hello world'})
    fillAndSavePost({
      body: `Hello world - ${counter}`,
    })

    counter += 1

    editPost({body: 'Hello world'})
    fillAndSavePost({
      body: `Hello world - ${counter}`,
    })
  })
})
