<script lang="ts">
import { defineComponent, computed, watch } from '@vue/composition-api'
import { provideFela, useClassName } from './composables/useFela'
import { useMediaQuery } from './composables/useMediaQuery'
import { lightTheme, darkTheme } from './styles/theme'
import { layout } from './styles/layout'
import AppHeader from './components/AppHeader.vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    HelloWorld,
  },
  setup() {
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = computed(() => (isDarkMode.value ? darkTheme : lightTheme))
    const fela = provideFela({ theme: theme.value })

    watch(theme, () => {
      fela.theme = theme.value
    })

    const wrapperClass = useClassName(layout.wrapper, {})
    const headerClass = useClassName(layout.headerWrapper, {})
    const footerClass = useClassName(layout.footerWrapper, {})
    const contentClass = useClassName(layout.contentWrapper, {})

    const setIsDarkMode = () => (isDarkMode.value = !isDarkMode.value)

    return {
      isDarkMode,
      setIsDarkMode,
      wrapperClass,
      headerClass,
      footerClass,
      contentClass,
    }
  },
})
</script>

<template>
  <div id="app" :class="wrapperClass">
    <header :class="headerClass">
      <AppHeader :isDarkMode="isDarkMode" :buttonHandler="setIsDarkMode" />
    </header>
    <main :class="contentClass">
      <img alt="Vue logo" src="./assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </main>
    <footer :class="footerClass">
      Challenge by
      <a
        href="//www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noopener noreferrer"
      >
        Frontend Mentor</a
      >. Coded by <a href="//domcoleman.com">Dom Coleman</a>.
    </footer>
  </div>
</template>

<style src="@/assets/reset.css"></style>
<style src="@/assets/global.css"></style>
