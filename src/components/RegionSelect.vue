<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { useClassName } from '@/composables/useFela'
import { regionSelect } from '@/styles/home'

interface RegionSelectProps {
  regions: string[]
  setValue: (value: string) => void
  value: string
}

export default defineComponent<RegionSelectProps>({
  props: {
    regions: Array,
    setValue: Function,
    value: String,
  },
  setup(props) {
    const componentEl = ref<HTMLDivElement>(null)
    const isOpen = ref(false)

    const toggleButtonHandler = () => {
      isOpen.value = !isOpen.value
    }

    const regionButtonHandler = (event: MouseEvent) => {
      if (!event.target) return
      const region = (event.target as Node).textContent || ''

      props.setValue(region.trim())
      isOpen.value = false
    }

    const documentClickHandler = (event: MouseEvent) => {
      if (!componentEl.value) return
      if (!componentEl.value.contains(event.target as Node)) {
        isOpen.value = false
      }
    }

    watch(isOpen, (newVal) => {
      if (newVal) {
        document.addEventListener('click', documentClickHandler, false)
      } else {
        document.removeEventListener('click', documentClickHandler, false)
      }
    })

    return {
      componentEl,
      isOpen,
      toggleButtonHandler,
      regionButtonHandler,
      wrapperClass: useClassName(regionSelect.wrapper),
      toggleButtonClass: useClassName(regionSelect.toggleButton),
      regionListClass: useClassName(regionSelect.regionList),
      regionButtonClass: useClassName(regionSelect.regionButton),
    }
  },
})
</script>

<template>
  <div ref="componentEl" :class="wrapperClass">
    <button
      @click="toggleButtonHandler"
      :class="toggleButtonClass"
      v-text="value || 'Filter By Region'"
      data-test="toggleButton"
    />
    <ul v-if="isOpen" :class="regionListClass" data-test="regionList">
      <li v-for="(region, index) in regions" :key="`region${index}`">
        <button
          @click="regionButtonHandler"
          :class="regionButtonClass"
          data-test="regionButton"
        >
          {{ region }}
        </button>
      </li>
    </ul>
  </div>
</template>
