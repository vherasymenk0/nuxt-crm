import { COLLECTION_DEALS, DB_ID } from '~/app.constants'
import { KANBAN_DATA } from '~/components/kanban/kanban.data'
import type { Deal } from '~/components/types/deals.types'
import { useQuery } from '@tanstack/vue-query'
import type { UseQueryReturnType } from '@tanstack/vue-query'
import type { Column } from '~/components/kanban/kanban.types'

export function useKanbanQuery(): UseQueryReturnType<Column[], Error> {
  return useQuery({
    queryKey: ['deals'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
    select(data) {
      const newBoard = [...KANBAN_DATA]
      const deals = data.documents as unknown as Deal[]

      for (const deal of deals) {
        const column = newBoard.find(({ id }) => id === deal.status)

        if (column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            id: deal.$id,
            name: deal.name,
            price: deal.price,
            companyName: deal.name,
            status: column.name,
          })
        }
      }

      return newBoard
    }
  })
}
