import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {authText} from "./shared/enums/auth.enums";
import {AuthService} from "../../core/services/auth-service";
import {AuthApiService} from "../../core/services/auth-api-service";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {CurrencyInfoApiService} from "../../core/services/currency-info-api-service";

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

  constructor(private authService: AuthService, private fb: FormBuilder,
              private authApi: AuthApiService, private cookieService: CookieService,
              private currencyApi: CurrencyInfoApiService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.state = 'normal'
    }, 300)
    const currencySub = this.currencyApi.getCurrencyInfoFromApi().subscribe(responseData => {
      this.cookieService.set('PLNtoEur', Object.values(responseData)[4].PLN);
      const PLNtoUSD = Object.values(responseData)[4].PLN / Object.values(responseData)[4].USD;
      this.cookieService.set('PLNtoUSD', PLNtoUSD.toString());
    })
    this.subscriptions.add(currencySub);
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
    const registerSub = this.authApi.register(email, name, password).subscribe(data => {
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
    const {email, password} = this.defaultForm.value;
    const loginSub = this.authApi.login(email, password).subscribe(data => {
      if (data.passwordCorrect) {
        this.cookieService.set('token', data.token);
        this.cookieService.set('expiration-date', data.expirationDate.toString())
        this.cookieService.set('userId', data.userId);
        this.cookieService.set('userName', data.userName);
        this.authService.onLogInActions();
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
