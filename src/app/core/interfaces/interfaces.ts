export interface User {
  email: string,
  name: string,
}

export interface RegisterUserData {
  email: string,
  name: string,
  password: string
}

//Group do DB
export interface Group {
  groupName: string,
  users: User[]
  expenses: Expense[]
}

//Group do add-group
export interface NewGroup {
  groupName: string,
  users: User[]
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

export interface LoginResponse {
  token: string;
  passwordCorrect: boolean,
}

export interface RegisterResponse {
  token: string,
  registerSuccess: boolean;
}
