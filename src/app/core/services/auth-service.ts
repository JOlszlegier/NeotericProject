import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({providedIn: "root"})

export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private router: Router, private cookieService: CookieService) {
  }


  public onLogInActions(): void {
    this.router.navigate(['/main']);
  }

  public onLogout(): void {
    this.router.navigate(['']);
    this.cookieService.deleteAll();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  public autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.onLogout()
    }, expirationDuration * 3600000)
  }
}
