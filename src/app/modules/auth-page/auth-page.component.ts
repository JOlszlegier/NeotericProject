import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

import {authText} from "./shared/enums/auth.enums";
import {AuthApiService} from "../../core/services/auth-api-service";
import {CurrencyInfoApiService} from "../../core/services/currency-info-api-service";
import {SnackbarEnums} from "../shared/snackbar-enums"
import {Router} from "@angular/router";
import {MessagesService} from "../../core/services/messages-service";

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


export class AuthPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription = new Subscription();
  public isInLogInMode: boolean = true;
  public switchButtonText: string = 'sign in';
  public state: string = 'hidden';
  public email: string = '';
  public password: string = '';
  public name: string = '';
  public defaultForm = this.fb.group({
    email: [''],
    password: [''],
  });
  public currencySub: Subscription = new Subscription();
  public isMobile: boolean = window.outerHeight < 700;
  public checkBool: boolean = false;

  constructor(private fb: FormBuilder,
              private authApi: AuthApiService, private cookieService: CookieService,
              private currencyApi: CurrencyInfoApiService, private snackBar: MatSnackBar,
              private router: Router, private messageService: MessagesService) {

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.outerHeight < 700;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.state = 'normal'
    }, 300)
    this.currencySub = this.currencyApi.getCurrencyInfoFromApi().subscribe(responseData => {
      this.cookieService.set('PLNtoEur', Object.values(responseData)[4].PLN);
      const PLNtoUSD = Object.values(responseData)[4].PLN / Object.values(responseData)[4].USD;
      this.cookieService.set('PLNtoUSD', PLNtoUSD.toString());
    })
    this.subscriptionsAdd(this.currencySub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  public subscriptionsAdd(sub: Subscription) {
    this.subscriptions.add(sub);
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
    const registerSub = this.authApi.register(email, name, password).subscribe(data => {
      if (data.registerSuccess) {
        this.messageService.openSuccessSnackBar(SnackbarEnums.AuthPageRegisterSuccess, 3000, this.isMobile)
        this.cookieService.set('token', data.token);
        this.isInLogInMode = true;
      } else {
        this.messageService.openErrorSnackBar(SnackbarEnums.AuthPageRegisterError, 3000, this.isMobile)
      }
    })
    this.subscriptions.add(registerSub);
  }

  public logIn(): void {
    const {email, password} = this.defaultForm.value;
    this.subscriptions.add(this.authApi.login(email, password).subscribe(data => {
      if (data.passwordCorrect) {
        this.checkBool = true;
        this.cookieService.set('token', data.token);
        this.cookieService.set('expiration-date', data.expirationDate.toString())
        this.cookieService.set('userId', data.userId);
        this.cookieService.set('userName', data.userName);
        this.router.navigate(['/main']);
      } else {
        this.messageService.openErrorSnackBar(SnackbarEnums.AuthPageLoginFailure, 3000, this.isMobile);
      }
    }))

  }

  public formSubmit(): void {
    if (this.isInLogInMode) {
      this.logIn();
    } else {
      this.signIn();
    }
  }


}
