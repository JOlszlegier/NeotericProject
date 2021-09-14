import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

interface loginResponse {
  loginStatus: boolean
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

  public createTest(email: string, name: string, password: string): void {
    this.http.post(this.createUserURL, {
      "name": name,
      "email": email,
      "password": password
    }).subscribe();
  }

  login(email: string, password: string): void {
    //tu działa
    //
    this.http.post<loginResponse>(this.logInUserURL, {
      "email": email,
      "password": password
    }).subscribe(data => {
      if (data.loginStatus) {
        //tu nie, mimo że ogólnie do data.loginStatus wchodzi to component dostaje false zawsze
        this.onLoginStatusChange(true);
        //
      }
    });
  }

}
