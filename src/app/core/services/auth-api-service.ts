import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})

export class AuthApiService {
  constructor(private http: HttpClient) {
  }

  public createUserURL: string = 'http://localhost:3000/create_user';
  public logInUserURL: string = 'http://localhost:3000/login';

  createTest(email: string, name: string, password: string) {
    this.http.post(this.createUserURL, {
      "name": name,
      "email": email,
      "password": password
    }).subscribe();
  }

  login(email: string, password: string) {
    this.http.post(this.logInUserURL, {
      "email": email,
      "password": password
    }).subscribe();
  }

}
