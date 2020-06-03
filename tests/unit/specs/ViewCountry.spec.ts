import { shallowMount } from '@vue/test-utils'
import ViewCountry from '@/components/ViewCountry.vue'
import restCountries from '../support/restCountries.json'

jest.mock('@/composables/useFela')

const country = {
  ...restCountries[0],
  borderCountries: restCountries[0].borders.map((alpha3Code) => ({
    alpha3Code,
  })),
}
const setCountryMock = jest.fn()
const factory = () =>
  shallowMount(ViewCountry, {
    propsData: { country, setCountry: setCountryMock },
  })

describe('ViewCountry.vue', () => {
  afterEach(() => {
    setCountryMock.mockClear()
  })

  describe('back button', () => {
    it('should call setCountry with no value', () => {
      const wrapper = factory()
      const backButton = wrapper.get('[data-test="backButton"]')
      backButton.trigger('click')

      expect(setCountryMock).toBeCalledWith()
    })
  })

  describe('border countries', () => {
    describe('when some', () => {
      it('should all be listed', async () => {
        const wrapper = factory()

        const borderCountryList = wrapper.find('[data-test="borderCountries"]')
        expect(borderCountryList.exists()).toBe(true)

        const borderCountries = wrapper.findAll('[data-test="borderCountry"]')
        expect(borderCountries.length).toBe(country.borders.length)
      })

      it('should call setCountry with the correct country code', () => {
        const wrapper = factory()

        const firstBorderCountryCode = country.borders[0]
        const borderCountryButton = wrapper.get('[data-test="borderCountry"]')
        borderCountryButton.trigger('click')

        expect(setCountryMock).toBeCalledWith(firstBorderCountryCode)
      })
    })

    describe('when none', () => {
      it('should not be visible', async () => {
        const wrapper = factory()
        wrapper.setProps({ country: { ...country, borderCountries: [] } })
        await wrapper.vm.$nextTick()

        const borderCountryList = wrapper.find('[data-test="borderCountries"]')
        expect(borderCountryList.exists()).toBe(false)
      })
    })
  })
})
