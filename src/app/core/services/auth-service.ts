import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({providedIn: "root"})

export class AuthService {

  constructor(private router: Router, private cookieService: CookieService) {
  }


  public onLogInActions(): void {
    this.router.navigate(['/main']);
  }

  public onLogout(): void {
    this.router.navigate(['']);
    this.cookieService.deleteAll();
  }


}
