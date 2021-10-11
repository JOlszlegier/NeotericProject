export interface CurrencyApiResponse {
  base: string;
  date: string;
  rates: number[]
}

export interface AddGroupResponse {
  name: string;
  usersEmails: string[];
}

export interface LoginResponse {
  token: string;
  passwordCorrect: boolean;
  expirationDate: number;
  userId: string;
  userName: string;
}

export interface RegisterResponse {
  token: string;
  registerSuccess: boolean;
}

export interface AddFriendResponse {
  friends: string[];
  errorMessage: string;
}

export interface CheckFriendResponse {
  correctUser: boolean;
}

export interface BalanceCheckResponse {
  outcome: number;
  income: number
}

export interface ValueOwedToUser {
  to: number;
  value: number;
}

export interface SettleUpInfoResponse {
  valueOwedToUser: [ValueOwedToUser],
  expensesId: [number];
  userNames: [string]
}

export interface SettleUpResponse {
  settleUpFinished: boolean;
}

export interface AddExpenseResponse {
  expenseAdded: boolean
}


export interface ExpensesInfo {
  expensesArray: [{ description: string, amount: number }];
}

