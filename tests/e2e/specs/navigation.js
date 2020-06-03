/// <reference types="Cypress" />

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate between the homepage and clicked country', function() {
    cy.get('[data-test="countriesIndex"]').should('exist')
    cy.get('[data-test="viewCountry"]').should('not.exist')

    cy.get('[data-test="countrySummary"]')
      .first()
      .find('button')
      .last()
      .then(($btn) => {
        const countryName = $btn.text().trim()
        $btn.click()

        cy.get('[data-test="countriesIndex"]').should('not.exist')
        cy.get('[data-test="viewCountry"]').should('exist')
        cy.get('h2')
          .contains(countryName)
          .should('exist')

        cy.get('[data-test="backButton"]').click()

        cy.get('[data-test="countriesIndex"]').should('exist')
        cy.get('[data-test="viewCountry"]').should('not.exist')
      })
  })

  it('should navigate between border countries', function() {
    cy.get('[data-test="viewCountry"]').should('not.exist')

    cy.get('[data-test="countrySummary"]')
      .first()
      .find('button')
      .first()
      .click()

    cy.get('[data-test="borderCountry"]')
      .first()
      .then(($btn) => {
        const countryName = $btn.text().trim()
        $btn.click()

        cy.get('h2')
          .contains(countryName)
          .should('exist')
      })
  })
})
