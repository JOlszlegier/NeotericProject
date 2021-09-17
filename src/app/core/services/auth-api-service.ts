import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";


interface loginResponse {
  token: string;
  passwordCorrect: boolean
}

interface registerResponse {
  token: string,
  registerSuccess: boolean;
}

@Injectable({providedIn: 'root'})

export class AuthApiService {
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  public createUserURL: string = 'http://localhost:3000/create_user';
  public logInUserURL: string = 'http://localhost:3000/login';
  public addGroupURL: string = 'http://localhost:3000/add-group';

  public register(email: string, name: string, password: string): Observable<registerResponse> {
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

  public addGroupPage(): Observable<any> {
    return this.http.get(this.addGroupURL,);
  }

  getToken() {
    return this.cookieService.get('token');
  }

}
