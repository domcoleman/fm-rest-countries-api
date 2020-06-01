/// <reference types="Cypress" />

const darkThemeBackground = '#202c37'
const lightThemeBackground = '#fafafa'

describe('Dark/Light Schemes', () => {
  describe('when dark mode preferred', () => {
    beforeEach(() => {
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'matchMedia')
            .withArgs('(prefers-color-scheme: dark)')
            .returns({
              matches: true,
              addEventListener: () => null,
            })
        },
      })
      cy.get('div#app').as('appWrapper')
      cy.get('div#app header button').as('schemeToggle')
    })

    it('should launch in dark mode', () => {
      cy.get('@appWrapper')
        .should('have.css', 'background-color')
        .and('be.colored', darkThemeBackground)
    })

    it('should toggle color modes when pressing the dark mode button', () => {
      cy.get('@schemeToggle').click()

      cy.get('@appWrapper')
        .should('have.css', 'background-color')
        .and('be.colored', lightThemeBackground)

      cy.get('@schemeToggle').click()

      cy.get('@appWrapper')
        .should('have.css', 'background-color')
        .and('be.colored', darkThemeBackground)
    })
  })

  describe('when light mode preferred', () => {
    beforeEach(() => {
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win, 'matchMedia')
            .withArgs('(prefers-color-scheme: dark)')
            .returns({
              matches: false,
              addEventListener: () => null,
            })
        },
      })
      cy.get('div#app').as('appWrapper')
      cy.get('div#app header button').as('schemeToggle')
    })

    it('should launch in light mode', () => {
      cy.get('@appWrapper')
        .should('have.css', 'background-color')
        .and('be.colored', lightThemeBackground)
    })

    it('should toggle color modes when pressing the dark mode button', () => {
      cy.get('@schemeToggle').click()

      cy.get('@appWrapper')
        .should('have.css', 'background-color')
        .and('be.colored', darkThemeBackground)

      cy.get('@schemeToggle').click()

      cy.get('@appWrapper')
        .should('have.css', 'background-color')
        .and('be.colored', lightThemeBackground)
    })
  })
})
