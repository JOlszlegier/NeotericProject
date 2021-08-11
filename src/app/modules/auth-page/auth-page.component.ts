import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";

import {AuthService} from "../../core/services/auth-service";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  isInLogInMode: boolean = true;
  switchButtonText: string = 'sign in'

  constructor(private authService: AuthService, private fb: FormBuilder) {

  }

  defaultForm = this.fb.group({
    email: [''],
    password: ['']
  })

  onSwitch() {
    this.isInLogInMode = !this.isInLogInMode;
    if (this.isInLogInMode) {
      this.switchButtonText = 'sign in '
      this.defaultForm.removeControl('name');
    } else {
      this.switchButtonText = 'log in';
      this.defaultForm.addControl('name', new FormControl(null, Validators.required));
    }
  }

  onLogIn() {
    this.authService.onLogInActions();
  }

}
