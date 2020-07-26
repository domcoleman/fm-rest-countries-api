<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useClassName } from '@/composables/useFela'
import { appHeader } from '@/styles/layout'
import { HeaderProps } from '@/types/ComponentOptions'

export default defineComponent<HeaderProps>({
  props: {
    isDarkMode: Boolean,
    buttonHandler: Function,
  },
  setup(props) {
    const wrapperClass = useClassName(appHeader.wrapper)
    const titleClass = useClassName(appHeader.title)
    const themeButtonClass = useClassName(appHeader.themeButton, props)

    return {
      wrapperClass,
      titleClass,
      themeButtonClass,
    }
  },
})
</script>

<template>
  <div :class="wrapperClass">
    <h1 :class="titleClass">Where in the world?</h1>
    <button :class="themeButtonClass" @click="buttonHandler">Dark Mode</button>
  </div>
</template>
