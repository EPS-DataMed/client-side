export interface RequestListDependents {
  userId: number
  token: string
}

export interface RequestDeleteDependent {
  userId: number
  dependentId: number
  token: string
}

export enum FormStatus {
  Filled = 'Filled',
  InProgress = 'In progress',
  NotStarted = 'Not started',
  Empty = 'null',
}

export interface Dependent {
  dependent_id: number
  confirmed: boolean
  user_id: number
  user_full_name: string
  user_birth_date: string
  user_email: string
  form_status: FormStatus
}

export interface RequestConfirmDependent {
  userId: number
  email: string
  token: string
}

export type ManagerUsersDialog = 'delete' | 'logout' | 'add_dependent' | ''
