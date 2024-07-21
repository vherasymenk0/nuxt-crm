import { EnumStatus } from '~/components/types/deals.types'
import type { Column } from '~/components/kanban/kanban.types'

export const KANBAN_DATA: Column[] = [
  {
    id: EnumStatus.todo,
    name: 'Incoming',
    items: [],
  },
  {
    id: EnumStatus.onApproval,
    name: 'On approval',
    items: [],
  },
  {
    id: EnumStatus.inProgress,
    name: 'In progress',
    items: [],
  },
  {
    id: EnumStatus.produced,
    name: 'Produced',
    items: [],
  },
  {
    id: EnumStatus.done,
    name: 'Done',
    items: [],
  },
]
