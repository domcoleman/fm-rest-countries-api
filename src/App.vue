<script lang="ts">
import { defineComponent, computed, watch } from '@vue/composition-api'
import { provideFela } from './composables/useFela'
import { useMediaQuery } from './composables/useMediaQuery'
import { lightTheme, darkTheme } from './styles/theme'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = computed(() => (isDarkMode.value ? darkTheme : lightTheme))
    const fela = provideFela({ theme: theme.value })

    watch(theme, () => {
      fela.theme = theme.value
    })

    return {
      theme,
      isDarkMode,
    }
  },
})
</script>

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<style src="@/assets/reset.css"></style>
