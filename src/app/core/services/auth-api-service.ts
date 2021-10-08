import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  addExpenseResponse,
  AddFriendResponse,
  AddGroupResponse,
  BalanceCheckResponse,
  CheckFriendResponse,
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
                    description: string): Observable<addExpenseResponse> {
    return this.http.post<addExpenseResponse>(`${environment.apiUrl}/add-expense`, {
      eachUserExpense, to, description
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

  public isInFriendList(user: string, friends: string): Observable<CheckFriendResponse> {
    return this.http.post<CheckFriendResponse>(`${environment.apiUrl}/friend-check`, {
      user, friends
    })
  }

  public balanceCheck(userId: string): Observable<BalanceCheckResponse> {
    return this.http.post<BalanceCheckResponse>(`${environment.apiUrl}/balance-check`, {
      userId
    })
  }

  public settleUpInfo(userId: string): Observable<SettleUpInfoResponse> {
    return this.http.post<SettleUpInfoResponse>(`${environment.apiUrl}/settle-up-info`, {
      userId
    })
  }

  public settleUp(userId: string, valueOwedToUser: [{ to: number, value: number }]): Observable<SettleUpResponse> {
    return this.http.post<SettleUpResponse>(`${environment.apiUrl}/settle-up`, {
      userId, valueOwedToUser
    })
  }
}
