export interface User {
  email: string,
  name: string,
}


//Group do add-group
export interface NewGroup {
  groupName: string,
  users: User[]
}


export interface LoginResponse {
  token: string;
  passwordCorrect: boolean,
  expirationDate: number,
  userId: string,
  userName: string;
}

export interface RegisterResponse {
  token: string,
  registerSuccess: boolean;
}

export interface addFriendResponse {
  friends: string[];
}

