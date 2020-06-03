import { shallowMount } from '@vue/test-utils'
import CountrySummary from '@/components/CountrySummary.vue'
import restCountries from '../support/restCountries.json'

jest.mock('@/composables/useFela')

const country = restCountries[0]
const setCountryMock = jest.fn()
const factory = () =>
  shallowMount(CountrySummary, {
    propsData: {
      country,
      setCountry: setCountryMock,
    },
  })

describe('CountrySummary.vue', () => {
  afterEach(() => {
    setCountryMock.mockClear()
  })

  it('should call setCountry when flag is clicked', () => {
    const wrapper = factory()

    expect(setCountryMock).not.toBeCalled()

    const flagButton = wrapper.get('button[data-test="flag"]')
    flagButton.trigger('click')

    expect(setCountryMock).toBeCalledWith(country.alpha3Code)
  })

  it('should call setCountry when country name is clicked', () => {
    const wrapper = factory()

    expect(setCountryMock).not.toBeCalled()

    const nameButton = wrapper.get('button[data-test="name"]')
    nameButton.trigger('click')

    expect(setCountryMock).toBeCalledWith(country.alpha3Code)
  })
})
