export interface currencyApiResponse {
  base: string,
  date: string,
  rates: number[]
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
  errorMessage: string;
}

export interface checkFriendResponse {
  correctUser: boolean
}


