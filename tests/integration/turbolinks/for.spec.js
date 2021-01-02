/* global describe, it, cy, expect */

describe('x-for directives', () => {
  it('should not add duplicate items when navigating away and back to the page', () => {
    cy.visit('/tests/res/turbolinks/for/index.html')

    // Check component works correctly
    cy.get('div').find('span').should('have.length', 2)

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/turbolinks/for/target.html')

    // Navigate back
    cy.go('back')
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/turbolinks/for/index.html')

    // Test
    cy.get('div').find('span').should('have.length', 2)
    cy.window().then((win) => {
      expect(win.console.error).not.to.be.called // eslint-disable-line no-unused-expressions
    })
  })
  it('should not remove siblings when navigating away and back to the page', () => {
    cy.visit('/tests/res/turbolinks/for-siblings/index.html')

    // Check component works correctly
    cy.get('div').find('template').should('have.length', 2)
    cy.get('div').find('span').should('have.length', 4)

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/turbolinks/for-siblings/target.html')

    // Navigate back
    cy.go('back')
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/turbolinks/for-siblings/index.html')

    // Tests
    cy.get('div').find('template').should('have.length', 2)
    cy.get('div').find('span').should('have.length', 4)
  })
})
