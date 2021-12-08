export const fillAndSavePost = ({author, body, save = true}) => {
  cy.get('.modal.show:visible').within(() => {
    if (author) {
      cy.input('author').typeText(author, {clear: true})
    }

    if (body) {
      cy.input('body').typeText(body, {clear: true})
    }
    if (save) {
      savePost()
    }
  })

  if (save) {
    checkPost({author, body});
  }
}


export const editPost = ({body}) => {
  cy.tide(`post-table-edit-${body}`).click()
}

export const savePost = () => {
  cy.tid('post-save-button').click()
}

export const checkPost = ({author, body}) => {
  if (author) {
    cy.tid('post-table-author').should('contain', author)
  }

  if (body) {
    cy.tid('post-table-body').should('contain', body)
  }
}
