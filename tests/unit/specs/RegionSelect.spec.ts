import { shallowMount } from '@vue/test-utils'
import RegionSelect from '@/components/RegionSelect.vue'

jest.mock('@/composables/useFela')

const regions = ['America', 'Europe', 'Oceania']
const setValueMock = jest.fn()
const factory = () =>
  shallowMount(RegionSelect, {
    propsData: { regions, setValue: setValueMock, value: '' },
  })

describe('RegionSelect.vue', () => {
  afterEach(() => {
    setValueMock.mockClear()
  })

  describe('initially', () => {
    it('should not show the region list', async () => {
      const wrapper = factory()

      const regionList = wrapper.find('[data-test="regionList"]')
      expect(regionList.exists()).toBe(false)
    })

    it('should show the region list when clicking the toggle button', async () => {
      const wrapper = factory()

      const toggleButton = wrapper.get('[data-test="toggleButton"]')
      await toggleButton.trigger('click')

      const regionList = wrapper.find('[data-test="regionList"]')
      expect(regionList.exists()).toBe(true)
    })
  })

  describe('when region list is visible', () => {
    let wrapper = factory()
    beforeEach(() => {
      wrapper = factory()
      wrapper.setData({ isOpen: true })
    })

    it('should not show the region list when clicking the toggle button', async () => {
      const toggleButton = wrapper.get('[data-test="toggleButton"]')
      await toggleButton.trigger('click')

      const regionList = wrapper.find('[data-test="regionList"]')
      expect(regionList.exists()).toBe(false)
    })

    it('should list each region', () => {
      const regionList = wrapper.get('[data-test="regionList"]')
      expect(regionList.findAll('[data-test="regionButton"]').length).toBe(
        regions.length,
      )
    })

    describe('region buttons', () => {
      it('should call setValue with button text content when clicked', () => {
        expect(setValueMock).not.toBeCalled()

        const regionButton = wrapper.get('[data-test="regionButton"]')
        regionButton.trigger('click')

        expect(setValueMock).toBeCalledWith(regionButton.text())
      })

      it('should not show the region list when clicked', async () => {
        const regionButton = wrapper.get('[data-test="regionButton"]')
        await regionButton.trigger('click')

        const regionList = wrapper.find('[data-test="regionList"]')
        expect(regionList.exists()).toBe(false)
      })
    })
  })
})
