import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

interface loginResponse {
  loginStatus: boolean
}

interface registerResponse {
  registerStatus: boolean;
}

@Injectable({providedIn: 'root'})

export class AuthApiService {
  constructor(private http: HttpClient) {
  }

  public createUserURL: string = 'http://localhost:3000/create_user';
  public logInUserURL: string = 'http://localhost:3000/login';


  private loginStatusSource = new BehaviorSubject<boolean>(false);
  public loginStatus = this.loginStatusSource.asObservable();


  public onLoginStatusChange(state: boolean): void {
    this.loginStatusSource.next(state);
  }

  public createTest(email: string, name: string, password: string): Observable<registerResponse> {
    return this.http.post<registerResponse>(this.createUserURL, {
      "name": name,
      "email": email,
      "password": password
    });
  }

  public login(email: string, password: string): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.logInUserURL, {
      "email": email,
      "password": password
    });
  }

}
