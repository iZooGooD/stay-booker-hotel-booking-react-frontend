/// <reference types="Cypress" />

describe('Homepage', () => {
  it('Clicking popular destinations cards navigate user to /hotels route', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid=image-card]').first().click()
    cy.url().should('eq', 'http://localhost:3000/hotels')
  })
})