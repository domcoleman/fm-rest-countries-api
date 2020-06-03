<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useClassName } from '@/composables/useFela'
import { countrySummary } from '@/styles/home'
import { Country } from '@/types/restcountries'

interface CountrySummaryProps {
  country: Country
  setCountry: (countryCode?: string) => void
}

export default defineComponent<CountrySummaryProps>({
  props: {
    country: Object,
    setCountry: Function,
  },
  setup({ country, setCountry }) {
    const buttonHandler = () => setCountry(country.alpha3Code)

    return {
      buttonHandler,
      wrapperClass: useClassName(countrySummary.wrapper, {}),
      flagClass: useClassName(countrySummary.flag, {}),
      contentClass: useClassName(countrySummary.content, {}),
      nameClass: useClassName(countrySummary.name, {}),
      statisticClass: useClassName(countrySummary.statistic, {}),
      statisticTitleClass: useClassName(countrySummary.statisticTitle, {}),
    }
  },
})
</script>

<template>
  <li :class="wrapperClass" data-test="countrySummary">
    <button data-test="flag" :class="flagClass" @click="buttonHandler">
      <img :src="country.flag" />
    </button>
    <div :class="contentClass">
      <button data-test="name" :class="nameClass" @click="buttonHandler">
        {{ country.name }}
      </button>
      <div :class="statisticClass">
        <span :class="statisticTitleClass">Population:</span>
        {{ country.population.toLocaleString() }}
      </div>
      <div :class="statisticClass">
        <span :class="statisticTitleClass">Region:</span>
        {{ country.region }}
      </div>
      <div :class="statisticClass">
        <span :class="statisticTitleClass">Capital:</span>
        {{ country.capital }}
      </div>
    </div>
  </li>
</template>
