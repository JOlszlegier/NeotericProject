export interface User {
  email: string,
  name: string
}

export interface Group {
  groupName: string,
  users: User[]
}
