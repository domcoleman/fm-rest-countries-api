<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useClassName } from '@/composables/useFela'
import { pillButton, viewCountry } from '@/styles/view'
import { MappedCountry } from '@/types/restcountries'

interface ViewCountryProps {
  country: MappedCountry
  setCountry: (countryCode?: string) => void
}

const listProperty = <T extends {}>(
  source: T[],
  property: keyof T,
  seperator = ', ',
) => source.map((value) => value[property]).join(seperator)

export default defineComponent<ViewCountryProps>({
  props: {
    country: Object,
    setCountry: Function,
  },
  setup(props) {
    const backButtonHandler = () => props.setCountry()

    const currencies = computed(() =>
      listProperty(props.country.currencies, 'name'),
    )

    const languages = computed(() =>
      listProperty(props.country.languages, 'name'),
    )

    return {
      currencies,
      languages,
      backButtonHandler,
      viewWrapperClass: useClassName(viewCountry.viewWrapper, {}),
      backButtonClass: useClassName(viewCountry.backButton, {}),
      countryWrapperClass: useClassName(viewCountry.countryWrapper, {}),
      flagClass: useClassName(viewCountry.flag, {}),
      countryNameClass: useClassName(viewCountry.countryName, {}),
      statisticGroupClass: useClassName(viewCountry.statisticGroup, {}),
      statisticClass: useClassName(viewCountry.statistic, {}),
      statisticTitleClass: useClassName(viewCountry.statisticTitle, {}),
      bordersTitleClass: useClassName(viewCountry.bordersTitle, {}),
      bordersClass: useClassName(viewCountry.borders, {}),
      bordersListClass: useClassName(viewCountry.bordersList, {}),
      borderCountryClass: useClassName(viewCountry.borderCountry, {}),
      borderCountryButtonClass: useClassName(pillButton, {}),
    }
  },
})
</script>

<template>
  <div :class="viewWrapperClass" data-test="viewCountry">
    <button
      data-test="backButton"
      :class="backButtonClass"
      @click="backButtonHandler"
    >
      Back
    </button>

    <div :class="countryWrapperClass">
      <div :class="flagClass">
        <img :src="country.flag" :alt="`${country.name}'s Flag`" />
      </div>
      <h2 :class="countryNameClass">{{ country.name }}</h2>
      <ul :class="statisticGroupClass">
        <li :class="statisticClass">
          <span :class="statisticTitleClass">Native Name:</span>
          {{ country.nativeName }}
        </li>
        <li :class="statisticClass">
          <span :class="statisticTitleClass">Population:</span>
          {{ country.population.toLocaleString() }}
        </li>
        <li :class="statisticClass">
          <span :class="statisticTitleClass">Region:</span>
          {{ country.region }}
        </li>
        <li :class="statisticClass">
          <span :class="statisticTitleClass">Sub Region:</span>
          {{ country.subregion }}
        </li>
        <li :class="statisticClass">
          <span :class="statisticTitleClass">Capital:</span>
          {{ country.capital }}
        </li>
      </ul>
      <ul :class="statisticGroupClass">
        <li :class="statisticClass">
          <span :class="statisticTitleClass">Top Level Domain:</span>
          {{ country.topLevelDomain.join(', ') }}
        </li>
        <li :class="statisticClass">
          <span :class="statisticTitleClass">Currencies:</span>
          {{ currencies }}
        </li>
        <li :class="statisticClass">
          <span :class="statisticTitleClass">Languages:</span> {{ languages }}
        </li>
      </ul>
      <div
        :class="bordersClass"
        v-if="country.borderCountries.length"
        data-test="borderCountries"
      >
        <h3 :class="bordersTitleClass">Border Countries:</h3>
        <ul :class="bordersListClass">
          <li
            v-for="borderCountry in country.borderCountries"
            :key="borderCountry.alpha3Code"
            :class="borderCountryClass"
          >
            <button
              :class="borderCountryButtonClass"
              :aria-label="`View ${borderCountry.name}`"
              @click="setCountry(borderCountry.alpha3Code)"
              data-test="borderCountry"
            >
              {{ borderCountry.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
