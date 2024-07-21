export interface BaseField {
  $createdAt: string
  $id: string
}

export interface Customer extends BaseField {
  name: string
  email: string
  avatar_url: string
  from_source?: string
}

export interface Comment extends BaseField {
  text: string
}

export enum EnumStatus {
  todo = 'todo',
  onApproval = 'on-approval',
  inProgress = 'in-progress',
  produced = 'produced',
  done = 'done',
}

export interface Deal extends BaseField {
  comments: Comment[]
  customer: Customer
  name: string
  price: number
  status: EnumStatus
}
