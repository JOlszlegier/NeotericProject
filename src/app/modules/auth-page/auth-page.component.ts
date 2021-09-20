import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {authText} from "./shared/enums/auth.enums";
import {AuthService} from "../../core/services/auth-service";
import {AuthApiService} from "../../core/services/auth-api-service";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

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
  public loginFailure: boolean = false;
  public registerFailure: boolean = false;
  public registerSuccess: boolean = false;
  public defaultForm = this.fb.group({
    email: [''],
    password: [''],
  })

  constructor(private authService: AuthService, private fb: FormBuilder, private authApi: AuthApiService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.state = 'normal'
    }, 300)
  }

  public onSwitch(): void {
    this.loginFailure = false;
    this.registerFailure = false;
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
    this.loginFailure = false;
    const {email, password, name} = this.defaultForm.value;
    const registerSub = this.authApi.register(email, password, name).subscribe(data => {
      if (data.registerSuccess) {
        this.registerSuccess = true;
        this.cookieService.set('token', data.token);
        this.isInLogInMode = true;
      } else {
        this.registerSuccess = false;
      }
    })
    this.subscriptions.add(registerSub);
  }

  public logIn(): void {
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getMinutes() + 2);
    const {email, password} = this.defaultForm.value;
    const loginSub = this.authApi.login(email, password).subscribe(data => {
      if (data.passwordCorrect) {
        this.cookieService.set('token', data.token);
        this.cookieService.set('expiration-date', expirationDate.getTime().toString());
        this.authService.onLogInActions();
        this.authService.autoLogout(1);
      } else {
        this.loginFailure = true;
      }
    })
    this.subscriptions.add(loginSub)
  }

  errorMessageHider() {
    if (this.loginFailure || this.registerFailure) {
      this.loginFailure = false;
      this.registerFailure = false;
    }
  }


  public formSubmit(): void {
    if (this.isInLogInMode) {
      this.logIn();
    } else {
      this.signIn();
    }
  }


}
