import {
  IRenderer as FelaRenderer,
  IConfig as FelaConfig,
  TRule,
  TRuleProps,
  TKeyFrame,
} from 'fela'
import { Theme } from '@/styles/theme'

export interface FelaProvider {
  renderer: FelaRenderer
  theme: Theme
}

export interface FelaProviderProps {
  theme?: Theme
  config?: Partial<FelaConfig>
}

export type FelaRule<T extends TRuleProps> = TRule<T & { theme: Theme }>

export type FelaKeyFrame<T extends TRuleProps> = TKeyFrame<T & { theme: Theme }>
