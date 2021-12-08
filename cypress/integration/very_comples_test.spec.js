import { fillAndSavePost, editPost, checkPost, savePost } from '../page_objects/post';

/* ---------------------------- */
// set skipTillStep to number of test that you want to continue with
//   0 - will peform full test
//   1 - will run all tests without setup
//   2 - will run all tests from 2 step (including) - will skip first step
//   3 - will run all tests from 3 step (including) - will skip first and second step

export const skipTillStep = 0;
// setting this true will skip all tests after skipTillStep  (usable for step by step)
const skipAfterTillStep = false;
/* ---------------------------- */

let skipAllTestAfterError = false;

Cypress.on('test:after:run', (ttt, runnable) => {
  if (ttt.err && ttt.invocationDetails.function === "testSkipUnlessPreviousRun") {
    skipAllTestAfterError = true
  }
})

export const testSkipUnlessPreviousRun = (currentStep, name, test) => {

  it(`${currentStep < 10 ? `0${currentStep}` : currentStep}: ${name}`, () => {
    if (skipAllTestAfterError) {
      cy.state('runnable').ctx.skip();
    }
    if (currentStep === 1) {
      cy.log('Clearing database', currentStep);
      cy.setup('data_type=complex');
    }

    cy.log('Current step number is', currentStep);
    if (currentStep < skipTillStep || (!!skipAfterTillStep && skipTillStep > 0 && currentStep > skipTillStep)) {
      cy.state('runnable').ctx.skip();
    }

    cy.visit('/')

    test();
  });
};

const newPost = {
  author: 'New Author',
  body: 'And this is new post',
}

describe('Create Post and multiple updates to same post', () => {
  testSkipUnlessPreviousRun(1, 'create new post', () => {
    cy.tid('post-new-button').click()
    fillAndSavePost(newPost)
  });

  testSkipUnlessPreviousRun(2, 'edit post', () => {
    editPost({body: 'And this is'})
    fillAndSavePost({
      body: `And this is super cool updated text`,
      save: false
    })

    //cy.tid('shoj')

    savePost()
  });

  testSkipUnlessPreviousRun(3, 'edit first post', () => {
    editPost({body: 'Find more layers'})
    fillAndSavePost({
      body: `Or start building rockets that can fly`,
    })
  });

  testSkipUnlessPreviousRun(4, 'edit second post', () => {
    editPost({body: 'Hello SpaceX'})
    fillAndSavePost({
      body: `Starship lets fly`,
    })
  });

  testSkipUnlessPreviousRun(5, 'check all posts', () => {
    checkPost({
      author: 'Jeff',
      body: `Or start building rockets that can fly`,
    })
    checkPost({
      author: 'Elon',
      body: `Starship lets fly`,
    })

    checkPost({
      author: 'John Doe',
      body: `Hello world`,
    })
    checkPost({...newPost, body: 'And this is super cool updated text'})
  });
});
