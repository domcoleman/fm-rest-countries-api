import { reactive, onBeforeMount, ref } from '@vue/composition-api'
import { FetchState } from '@/types/Fetch'

export const useFetch = <T>(endpoint: string) => {
  const state = reactive<FetchState>({
    error: '',
    isLoading: false,
  })
  const result = ref<T[]>([])

  const fetchFromApi = async () => {
    try {
      state.isLoading = true
      state.error = ''
      result.value = []

      const response = await fetch(endpoint)
      if (response.status !== 200) {
        throw new Error(
          'There was an error fetching data from the specified API endpoint.',
        )
      } else {
        const data = (await response.json()) as T[]
        result.value.push(...data)
      }
    } catch (error) {
      state.error = error.message
    } finally {
      state.isLoading = false
    }
  }

  onBeforeMount(fetchFromApi)

  return {
    state,
    result,
    fetchFromApi,
  }
}
