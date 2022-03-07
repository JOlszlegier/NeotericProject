import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  AddExpenseResponse,
  BalanceCheckResponse,
  ExpensesInfo,
  LoginResponse,
  RegisterResponse,
  SettleUpInfo
} from "../interfaces/interfaces";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})

export class AuthApiService {
  constructor(private http: HttpClient) {
  }

  //DONE
  public register(user_email: string, name: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.nestBackend}/user/register`, {
      name, user_email, password
    });
  }

  //DONE
  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.nestBackend}/user/log-in`, {
      email, password
    }, {withCredentials: true});
  }

  //DONE
  public createGroup(groupName: string, usersEmails: string[]): Observable<any> {
    return this.http.post<any>(`${environment.nestBackend}/group`, {
      groupName, usersEmails
    });
  }

  //DONE
  public searchGroup(userId: string): Observable<any> {
    let params = new HttpParams().set('userId', userId)
    return this.http.get<string[]>(`${environment.nestBackend}/group/group-list`, {
      params: params
    });
  }

  //DONE
  public getUsersInGroup(groupName: string, userId: number): Observable<string[]> {
    let params = new HttpParams();
    params = params.append('userId', userId)
    params = params.append('groupName', groupName)
    return this.http.get<string[]>(`${environment.nestBackend}/group/users-in-group`, {
      params: params
    })
  }

  //DONE
  public addExpense(eachUserValue: [{ from: string, value: number }],
                    payerEmail: string,
                    description: string, groupName: string, amount: number): Observable<AddExpenseResponse> {
    return this.http.post<AddExpenseResponse>(`${environment.nestBackend}/transaction`, {
      eachUserValue, payerEmail, description, groupName, amount
    })
  }

  //DONE
  public addFriend(userId: string, friendEmail: string): Observable<string[]> {
    return this.http.post<string[]>(`${environment.nestBackend}/user/friend`, {
      userId, friendEmail
    })
  }

  //DONE
  public getFriendsList(userId: number): Observable<string[]> {
    let params = new HttpParams().set('userId', userId)
    return this.http.get<string[]>(`${environment.nestBackend}/user/friend/list`, {
      params: params
    })
  }

  //DONE
  public isUserInYourFriendsList(userId: number, friendEmail: string): Observable<any> {
    let params = new HttpParams;
    params = params.append('userId', userId);
    params = params.append('friendEmail', friendEmail);
    return this.http.get<any>(`${environment.nestBackend}/group`, {
      params: params
    })
  }

  //DONE
  public isInFriendList(userId: number, newUserEmail: string, groupName: string): Observable<boolean> {
    let params = new HttpParams;
    params = params.append('userId', userId);
    params = params.append('newUserEmail', newUserEmail);
    params = params.append('groupName', groupName);
    return this.http.get<boolean>(`${environment.nestBackend}/transaction`, {
      params: params
    })
  }

  //DONE
  public balanceCheck(userId: number, groupName: string): Observable<BalanceCheckResponse> {
    let params = new HttpParams().set('userId', userId)
    params = params.append('groupName', groupName)
    return this.http.get<BalanceCheckResponse>(`${environment.nestBackend}/transaction/balance`, {
      params: params
    })
  }


  //DONE
  public settleUpInfo(userId: string, groupName: string): Observable<SettleUpInfo> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('groupName', groupName);
    return this.http.get<SettleUpInfo>(`${environment.nestBackend}/transaction/settleUpInfo`, {
      params: params
    })
  }

  //DONE
  public settleUp(userId: string, groupName: string): Observable<any> {
    return this.http.post<any>(`${environment.nestBackend}/transaction/settleUp`, {
      userId, groupName
    })
  }

  //DONE
  public expensesInfoPlus(userId: string, groupName: string): Observable<ExpensesInfo> {
    let params = new HttpParams().set('userId', userId);
    params = params.append('groupName', groupName)
    return this.http.get<ExpensesInfo>(`${environment.nestBackend}/transaction/getTransactionInfo`, {
      params: params
    })
  }

  //DONE
  public expensesInfoMinus(userId: string, groupName: string): Observable<ExpensesInfo> {
    let params = new HttpParams().set('userId', userId);
    params = params.append('groupName', groupName)
    return this.http.get<ExpensesInfo>(`${environment.nestBackend}/transaction/getTransactionRecipientsInfo`, {
      params: params
    })
  }
}
