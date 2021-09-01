export interface User {
  email: string,
  name: string,
  friends?: User[],
  groups?: Group[]
}

export interface Group {
  groupName: string,
  users: User[]
  expenses?: Expense[]
}

export interface Expense {
  from: User,
  to: User[],
  value: number,
  currency: string,
  conversionRate?: number,
  description: string;
  inGroup: boolean;
  groupName?: string
}
