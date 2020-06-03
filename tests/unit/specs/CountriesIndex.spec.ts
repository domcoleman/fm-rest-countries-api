import { shallowMount } from '@vue/test-utils'
import CountriesIndex from '@/components/CountriesIndex.vue'
import restCountries from '../support/restCountries.json'

jest.mock('@/composables/useFela')

const factory = () =>
  shallowMount(CountriesIndex, {
    propsData: {
      countries: restCountries,
      setCountry: () => void null,
    },
  })

describe('CountriesIndex.vue', () => {
  it('should list each country', () => {
    const wrapper = factory()
    const summaryComponents = wrapper.findAll('countrysummary-stub')

    expect(summaryComponents.length).toBe(restCountries.length)
  })

  it('should filter countries by search query', async () => {
    const searchQuery = 'co'
    const queryExpression = new RegExp(`^${searchQuery}`, 'i')
    const filteredCountries = restCountries.filter(
      ({ name, nativeName }) =>
        name.match(queryExpression) || nativeName.match(queryExpression),
    )

    const wrapper = factory()
    const searchQueryInput = wrapper.find('#searchQuery')
    await searchQueryInput.setValue(searchQuery)

    const summaryComponents = wrapper.findAll('countrysummary-stub')
    expect(summaryComponents.length).toBe(filteredCountries.length)
  })

  it('should filter countries by region', async () => {
    const filterRegion = 'Europe'
    const filterExpression = new RegExp(`^${filterRegion}`, 'i')
    const filteredCountries = restCountries.filter(({ region }) =>
      region.match(filterExpression),
    )

    const wrapper = factory()
    await wrapper.setData({ regionFilter: filterRegion })

    const summaryComponents = wrapper.findAll('countrysummary-stub')
    expect(summaryComponents.length).toBe(filteredCountries.length)
  })
})
