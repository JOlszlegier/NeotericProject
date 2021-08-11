import {Component} from '@angular/core';

import {AuthService} from "../../core/services/auth-service";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  constructor(private authService: AuthService) {
  }

  onSignIn() {
    this.authService.onSignInActions();
  }

  onLogIn() {
    this.authService.onLogInActions();
  }

}
