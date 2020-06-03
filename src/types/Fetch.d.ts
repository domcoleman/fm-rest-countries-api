import { Ref } from '@vue/composition-api'

export interface FetchState {
  error: string
  isLoading: boolean
}

export interface UseFetch<T> {
  state: FetchState
  result: Ref<T[]>
  fetchFromApi: () => Promise<void>
}
