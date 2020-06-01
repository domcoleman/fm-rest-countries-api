import { shallowMount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader.vue'

jest.mock('@/composables/useFela')

describe('AppHeader.vue', () => {
  describe('Theme Button', () => {
    it('calls buttonHandler', async () => {
      const buttonHandler = jest.fn()
      const wrapper = shallowMount(AppHeader, {
        propsData: { isDarkMode: false, buttonHandler },
      })

      expect(buttonHandler).not.toBeCalled()
      const themeButton = wrapper.find('button')
      await themeButton.trigger('click')

      expect(buttonHandler).toBeCalled()
    })
  })
})
