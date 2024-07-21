import type { EnumStatus } from '~/components/types/deals.types'

export interface Card {
  id: string
  name: string
  price: number
  $createdAt: string
  companyName: string
  status: string
}

export interface Column {
  id: EnumStatus
  name: string
  items: Card[]
}
