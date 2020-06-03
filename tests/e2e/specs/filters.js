/// <reference types="Cypress" />

export const API_ENDPOINT =
  'https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;nativeName;population;region;subregion;capital;currencies;languages;borders;alpha3Code;flag'

describe('Country Filters', () => {
  /**
   * Remove Fetch API & replace with polyfill.
   */
  let polyfill
  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js'

    cy.request(polyfillUrl).then((response) => {
      polyfill = response.body
    })
  })

  beforeEach(() => {
    cy.server()
    cy.route(API_ENDPOINT, 'fixture:restcountries').as('getCountries')

    cy.visit('/', {
      onBeforeLoad(win) {
        delete win.fetch
        win.eval(polyfill)
        win.fetch = win.unfetch
      },
    })
    cy.wait(['@getCountries'])
      .its('response.body')
      .as('response')
  })

  it('should list each country', function() {
    cy.get('ul[data-test="countryList"]')
      .children()
      .its('length')
      .should('eq', this.response.length)
  })

  it('should filter by region', function() {
    const firstRegion = this.response.map(({ region }) => region).sort()[0]
    const filteredCountries = this.response.filter(
      (country) => country.region === firstRegion,
    )

    cy.get('button[data-test="toggleButton"]').click()
    cy.get('ul[data-test="regionList"]')
      .children()
      .find('button')
      .invoke('first')
      .click()
    cy.get('ul[data-test="countryList"]')
      .children()
      .its('length')
      .should('eq', filteredCountries.length)
  })

  it('should close region list when clicked outside', function() {
    cy.get('button[data-test="toggleButton"]').click()
    cy.get('ul[data-test="regionList"]').should('exist')

    cy.get('header').click()

    cy.get('ul[data-test="regionList"]').should('not.exist')
  })
})
