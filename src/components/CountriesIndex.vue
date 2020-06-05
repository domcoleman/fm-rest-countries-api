<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import { useClassName } from '@/composables/useFela'
import { navigation } from '@/styles/home'
import { Country } from '@/types/restcountries'
import CountrySummary from './CountrySummary.vue'
import RegionSelect from './RegionSelect.vue'

interface CountriesIndexProps {
  countries: Country[]
  setCountry: (countryCode?: string) => void
}

export default defineComponent<CountriesIndexProps>({
  components: {
    CountrySummary,
    RegionSelect,
  },
  props: {
    countries: Array,
    setCountry: Function,
  },
  setup(props) {
    const searchQuery = ref<string>('')
    const regionFilter = ref<string>('')
    const setRegionFilter = (region?: string) =>
      (regionFilter.value = region || '')

    const filteredCountries = computed(() => {
      const searchQueryExpression = new RegExp(
        `^${searchQuery.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
        'i',
      )

      if (!searchQuery.value && !regionFilter.value) return props.countries

      return props.countries.filter(
        ({ region, name, nativeName }) =>
          region.match(regionFilter.value) &&
          (name.match(searchQueryExpression) ||
            nativeName.match(searchQueryExpression)),
      )
    })

    const regions = computed(() =>
      props.countries
        .reduce((regions, { region }) => {
          if (region && !regions.includes(region)) regions.push(region)
          return regions
        }, [] as string[])
        .sort(),
    )

    return {
      searchQuery,
      regionFilter,
      setRegionFilter,
      filteredCountries,
      regions,
      // styles
      navigationClass: useClassName(navigation.wrapper, {}),
      searchQueryClass: useClassName(navigation.searchQuery, {}),
      countryListClass: useClassName(navigation.countryList, {}),
    }
  },
})
</script>

<template>
  <div data-test="countriesIndex">
    <nav :class="navigationClass">
      <input
        id="searchQuery"
        placeholder="Search for a country..."
        aria-label="Search for a country"
        v-model="searchQuery"
        :class="searchQueryClass"
      />
      <RegionSelect
        :regions="regions"
        :value="regionFilter"
        :set-value="setRegionFilter"
      />
    </nav>
    <ul :class="countryListClass" data-test="countryList">
      <CountrySummary
        v-for="country in filteredCountries"
        :key="country.alpha3Code"
        :country="country"
        :set-country="setCountry"
      />
    </ul>
  </div>
</template>
