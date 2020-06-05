<script lang="ts">
import { defineComponent, computed, watch, ref } from '@vue/composition-api'
import { provideFela, useClassName } from './composables/useFela'
import { useMediaQuery } from './composables/useMediaQuery'
import { useFetch } from './composables/useFetch'
import { lightTheme, darkTheme } from './styles/theme'
import { layout } from './styles/layout'
import { API_ENDPOINT } from './consts'
import { Country, MappedCountry } from './types/restcountries'

import AppHeader from './components/AppHeader.vue'
import CountriesIndex from './components/CountriesIndex.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    CountriesIndex,
    ViewCountry: () => import('./components/ViewCountry.vue'),
  },
  setup() {
    const currentCountryCode = ref<string>()
    const { state: fetchState, result } = useFetch<Country>(API_ENDPOINT)
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)', false)
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
    const setCountry = (countryCode?: string) =>
      (currentCountryCode.value = countryCode)

    const currentCountry = computed<MappedCountry | undefined>(() => {
      const country = result.value.find(
        ({ alpha3Code }) => alpha3Code === currentCountryCode.value,
      )

      if (!country) return undefined

      return {
        ...country,
        borderCountries: country.borders.map((alpha3Code) => {
          const borderCountry = result.value.find(
            (borderCountry) => borderCountry.alpha3Code === alpha3Code,
          )

          return {
            alpha3Code: borderCountry?.alpha3Code || '',
            name: borderCountry?.name || '',
          }
        }),
      }
    })

    return {
      currentCountry,
      setCountry,
      isLoading: fetchState.isLoading,
      error: fetchState.error,
      countries: result,
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
      <ViewCountry
        v-if="currentCountry"
        :country="currentCountry"
        :setCountry="setCountry"
      />
      <CountriesIndex v-else :countries="countries" :setCountry="setCountry" />
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
