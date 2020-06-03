import {
  provide,
  inject,
  computed,
  onBeforeUnmount,
  reactive,
  onMounted,
} from '@vue/composition-api'
import { createRenderer } from 'fela'
import { rehydrate, render } from 'fela-dom'
import {
  FelaProviderProps,
  FelaProvider,
  FelaRule,
  FelaKeyFrame,
} from '@/types/Fela'

const FelaSymbol = Symbol()

export const provideFela = ({ theme, config }: FelaProviderProps) => {
  const renderer = createRenderer(config)
  const fela = reactive({ renderer, theme })

  provide(FelaSymbol, fela)

  onBeforeUnmount(() => renderer.clear())

  onMounted(() => {
    rehydrate(renderer)
    render(renderer)
  })

  return fela
}

export const useFela = () => {
  const fela = inject<FelaProvider>(FelaSymbol)

  if (!fela) {
    throw new Error(
      'useFela cannot be called by a component that is not a descendent of a component that has called provideFela.',
    )
  }

  return fela
}

export const useClassName = <T>(rule: FelaRule<T>, props: T) => {
  const fela = useFela()

  return computed(() =>
    fela.renderer.renderRule(rule, { ...props, theme: fela.theme }),
  )
}

export const useKeyframes = <T>(keyFrame: FelaKeyFrame<T>, props: T) => {
  const fela = useFela()

  return computed(() =>
    fela.renderer.renderKeyframe(keyFrame, { ...props, theme: fela.theme }),
  )
}

/**
 * Type safety for creating styles outside of Vue scope.
 */
export const createStyle = <T>(rule: FelaRule<T>) => rule
export const createKeyFrames = <T>(keyFrame: FelaKeyFrame<T>) => keyFrame

export { combineRules } from 'fela'
