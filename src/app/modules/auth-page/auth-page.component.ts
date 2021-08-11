import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";

import {AuthText} from "../../core/services/shared/enums";
import {AuthService} from "../../core/services/auth-service";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})


export class AuthPageComponent {
  public AuthText = AuthText;
  public isInLogInMode: boolean = true;
  public switchButtonText: string = 'sign in'

  public defaultForm = this.fb.group({
    email: [''],
    password: ['']
  })

  constructor(private authService: AuthService, private fb: FormBuilder) {

  }


  public onSwitch() {
    this.isInLogInMode = !this.isInLogInMode;
    if (this.isInLogInMode) {
      this.switchButtonText = AuthText.SignIn
      this.defaultForm.removeControl('name');
    } else {
      this.switchButtonText = AuthText.LogIn;
      this.defaultForm.addControl('name', new FormControl(null, Validators.required));
    }
  }

  public onLogIn() {
    this.authService.onLogInActions();
  }

}
