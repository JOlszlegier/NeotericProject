import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";

import {authText} from "./shared/enums/auth.enums";
import {AuthService} from "../../core/services/auth-service";
import {AuthApiService} from "../../core/services/auth-api-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  animations: [
    trigger('buttonState', [
      state('hidden', style({
        'opacity': 0.4
      })),
      state('normal', style({
        'opacity': 1
      })),
      transition('hidden => normal', animate(800)),
    ])
  ]
})


export class AuthPageComponent implements OnInit {
  private subscriptions!: Subscription;
  public isInLogInMode: boolean = true;
  public switchButtonText: string = 'sign in';
  public state: string = 'hidden';
  public email: string = '';
  public password: string = '';
  public name: string = '';
  public defaultForm = this.fb.group({
    email: [''],
    password: [''],
  })

  constructor(private authService: AuthService, private fb: FormBuilder, private authApi: AuthApiService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.state = 'normal'
    }, 300)
  }

  public onSwitch(): void {
    this.isInLogInMode = !this.isInLogInMode;
    if (this.isInLogInMode) {
      this.switchButtonText = authText.SignIn
      this.defaultForm.removeControl('name');
    } else {
      this.switchButtonText = authText.LogIn;
      this.defaultForm.addControl('name', new FormControl(null, Validators.required));
    }
  }

  public signIn(): void {
    const {email, password, name} = this.defaultForm.value;
    const registerSub = this.authApi.register(email, password, name).subscribe(data => {
      if (data.registerStatus) {
        this.authService.onLogInActions();
      } else {
        alert(`Email already taken!`)
      }
    })
    this.subscriptions.add(registerSub);
  }

  public logIn(): void {
    const {email, password} = this.defaultForm.value;
    const loginSub = this.authApi.login(email, password).subscribe(data => {
      if (data.loginStatus) {
        this.authService.onLogInActions();
      } else {
        alert(`Wrong password`);
      }
    })
    this.subscriptions.add(loginSub)
  }


  public formSubmit(): void {
    if (this.isInLogInMode) {
      this.logIn();
    } else {
      this.signIn();
    }
  }

}
