import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
import { COLLECTION_DEALS, DB_ID } from '~/app.constants'
import { SLIDEOVER_KEY } from '~/utils/keys'
import type { Slideover } from '~/components/kanban/slideover/useSlideover'
import type { Deal } from '~/components/types/deals.types'

export function useComments(): UseQueryReturnType<Deal, Error> {
  const { state } = inject(SLIDEOVER_KEY) as Slideover
  const cardId = state.card?.id || ''

  return useQuery({
    queryKey: ['deal', cardId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId),
  })
}
