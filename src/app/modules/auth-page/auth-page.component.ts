import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth-service";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSignIn() {
    this.authService.onSignInActions();
  }

  onLogIn() {
    this.authService.onLogInActions();
  }

}