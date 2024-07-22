import type { Card } from '~/components/kanban/kanban.types'
import { SLIDEOVER_KEY } from '~/utils/keys'

export type Slideover = {
  state: {
    card: Card | null
    isOpen: boolean
  }
  set: (card: Card) => void
}

type State = {
  card: Card | null
  isOpen: boolean
}


export function useSlideover(): Slideover {
  const state = reactive<State>({ card: null, isOpen: false })

  const set = (card: Card) => {
    state.isOpen = true
    state.card = card
  }

  watchEffect(() => {
    if (!state.isOpen) state.card = null
  })

  provide(SLIDEOVER_KEY, { state, set })

  return { state, set }
}
