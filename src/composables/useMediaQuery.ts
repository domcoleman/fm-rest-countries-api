import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api'

export const useMediaQuery = (query: string, defaultValue = true) => {
  let mql: MediaQueryList
  const matches = ref(defaultValue)

  const onChangeHandler = (event: MediaQueryList | MediaQueryListEvent) =>
    (matches.value = event.matches)

  onMounted(() => {
    if (!window.matchMedia) {
      console.log('match media undefined')
      return
    }

    mql = window.matchMedia(query)
    mql.addEventListener('change', onChangeHandler)
    onChangeHandler(mql)
  })

  onBeforeUnmount(() => {
    mql.removeEventListener('change', onChangeHandler)
  })

  return matches
}
