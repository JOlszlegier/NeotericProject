import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {addFriendResponse, checkFriendResponse, LoginResponse, RegisterResponse} from "../interfaces/interfaces";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})

export class AuthApiService {
  constructor(private http: HttpClient) {
  }

  public register(email: string, name: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/create-us`, {
      name, email, password
    });
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, {
      email, password
    });
  }

  public createGroup(name: string, usersEmails: string[]): Observable<any> {
    return this.http.post(`${environment.apiUrl}/add-group`, {
      name, usersEmails
    });
  }

  public searchGroup(userId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/group-check`, {
      userId
    });
  }

  public getUsersInGroup(name: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/group-users`, {
      name
    })
  }

  public addExpense(eachUserExpense: [{ from: string, value: number }],
                    to: string,
                    description: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/add-expense`, {
      eachUserExpense, to, description
    })
  }

  public addFriend(user: string, friends: string): Observable<addFriendResponse> {
    return this.http.post<addFriendResponse>(`${environment.apiUrl}/add-friend`, {
      user, friends
    })
  }

  public getFriendsList(user: string): Observable<addFriendResponse> {
    return this.http.post<addFriendResponse>(`${environment.apiUrl}/friends-list`, {
      user
    })
  }

  public isInFriendList(user: string, friends: string): Observable<checkFriendResponse> {
    return this.http.post<checkFriendResponse>(`${environment.apiUrl}/friend-check`, {
      user, friends
    })
  }
}
