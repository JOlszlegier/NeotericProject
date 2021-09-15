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
  public loginSuccess: boolean = false;
  public time: Date = new Date();
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
    this.subscriptions = this.authApi.loginStatus.subscribe(state => this.loginSuccess = state);
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
    this.email = this.defaultForm.value.email;
    this.name = this.defaultForm.value.name;
    this.password = this.defaultForm.value.password;
    this.authApi.createTest(this.email, this.name, this.password).subscribe();
    this.authService.onLogInActions();
  }

  public async logIn(): Promise<void> {
    this.email = this.defaultForm.value.email;
    this.password = this.defaultForm.value.password;
    this.authApi.login(this.email, this.password).subscribe(data => {
      this.authApi.onLoginStatusChange(true);
      console.log(`Test ${this.loginSuccess}`);
    });
    this.authService.onLogInActions();
  }

  public async formSubmit(): Promise<void> {
    if (this.isInLogInMode) {
      this.logIn().then(r => console.log(this.loginSuccess));
    } else {
      this.signIn()
    }
  }

}
