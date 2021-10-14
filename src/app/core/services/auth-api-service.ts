import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  AddExpenseResponse,
  AddFriendResponse,
  AddGroupResponse,
  BalanceCheckResponse,
  CheckFriendResponse,
  ExpensesInfo,
  LoginResponse,
  RegisterResponse,
  SettleUpInfoResponse,
  SettleUpResponse
} from "../interfaces/interfaces";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})

export class AuthApiService {
  constructor(private http: HttpClient) {
  }

  public register(email: string, name: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/create-user`, {
      name, email, password
    });
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, {
      email, password
    });
  }

  public createGroup(name: string, usersEmails: string[]): Observable<AddGroupResponse> {
    return this.http.post<AddGroupResponse>(`${environment.apiUrl}/add-group`, {
      name, usersEmails
    });
  }

  public searchGroup(userId: string): Observable<string[]> {
    return this.http.post<string[]>(`${environment.apiUrl}/group-check`, {
      userId
    });
  }

  public getUsersInGroup(name: string): Observable<string[]> {
    return this.http.post<string[]>(`${environment.apiUrl}/group-users`, {
      name
    })
  }

  public addExpense(eachUserExpense: [{ from: string, value: number }],
                    to: string,
                    description: string, groupName: string): Observable<AddExpenseResponse> {
    return this.http.post<AddExpenseResponse>(`${environment.apiUrl}/add-expense`, {
      eachUserExpense, to, description, groupName
    })
  }

  public addFriend(user: string, friends: string): Observable<AddFriendResponse> {
    return this.http.post<AddFriendResponse>(`${environment.apiUrl}/add-friend`, {
      user, friends
    })
  }

  public getFriendsList(user: string): Observable<AddFriendResponse> {
    return this.http.post<AddFriendResponse>(`${environment.apiUrl}/friends-list`, {
      user
    })
  }

  public isInFriendList(user: string, friends: string, groupName: string): Observable<CheckFriendResponse> {
    return this.http.post<CheckFriendResponse>(`${environment.apiUrl}/friend-check`, {
      user, friends, groupName
    })
  }

  public balanceCheck(userId: string): Observable<BalanceCheckResponse> {
    return this.http.post<BalanceCheckResponse>(`${environment.apiUrl}/balance-check`, {
      userId
    })
  }

  public settleUpInfo(userId: string, groupName: string): Observable<SettleUpInfoResponse> {
    return this.http.post<SettleUpInfoResponse>(`${environment.apiUrl}/settle-up-info`, {
      userId, groupName
    })
  }

  public settleUp(userId: string, valueOwedToUser: [{ to: number, value: number }], groupName: string): Observable<SettleUpResponse> {
    return this.http.post<SettleUpResponse>(`${environment.apiUrl}/settle-up`, {
      userId, valueOwedToUser, groupName
    })
  }

  public expensesInfoPlus(userId: string, groupName: string): Observable<ExpensesInfo> {
    return this.http.post<ExpensesInfo>(`${environment.apiUrl}/expenses-info-to-user`, {
      userId, groupName
    })
  }

  public expensesInfoMinus(userId: string, groupName: string): Observable<ExpensesInfo> {
    return this.http.post<ExpensesInfo>(`${environment.apiUrl}/expenses-info-from-user`, {
      userId, groupName
    })
  }
}
