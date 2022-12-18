/// <reference types="cypress"/>
import App from '../../src/App'

describe('App.cy.ts', () => {
  beforeEach(() => {
    cy.mount(<App />)
  })

  it('playground', () => {
    const message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`

    cy.get('[data-testid="original-text"]').clear()

    cy.get('[data-testid="original-text"]').type(message, { delay: 0 })
    cy.get('[data-testid="encrypt-button"]').click()
    cy.get('[data-testid="decrypted-text"]').should('not.be.empty')
    cy.get('[data-testid="decrypted-text"]').should('have.text', message)
  })
})