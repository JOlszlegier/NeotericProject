import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})

export class AuthApiService {
  constructor(private http: HttpClient) {
  }

  public URL: string = 'http://localhost:3000/create_user';

  createTest(email: string, name: string, password: string) {
    this.http.post(this.URL, {
      "name": name,
      "email": email,
      "password": password
    }).subscribe();
  }

}
