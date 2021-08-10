import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})

export class AuthService {
  constructor(private router: Router) {
  }

  onSignInActions() {
    this.router.navigate(['/new-user']);
  }

  onLogInActions() {
    this.router.navigate(['/main']);
  }
}
