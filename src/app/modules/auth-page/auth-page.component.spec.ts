import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {of} from "rxjs";


import {AuthPageComponent} from './auth-page.component';
import {AuthApiService} from "../../core/services/auth-api-service";
import {CurrencyInfoApiService} from "../../core/services/currency-info-api-service";
import {AuthApiServiceMock, CookieServiceMock, snackbarMock} from "../../../unit/auth-mock";

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;
  let router: Router;
  let authApiService: AuthApiService;
  let cookieService: CookieService;


  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthPageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule, MatSnackBarModule],
      providers: [
        {provide: AuthApiService, useClass: AuthApiServiceMock},
        {provide: CookieService, useClass: CookieServiceMock},
        {provide: CurrencyInfoApiService},
        {provide: MatSnackBar, useValue: snackbarMock},
        {
          provide: Router, useClass: class {
            navigate = jest.fn();
          }
        }
      ]
    })
      .compileComponents();
    router = TestBed.get(Router);
    authApiService = TestBed.get(AuthApiService)
    cookieService = TestBed.get(CookieService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


  describe('ngOnInit', () => {
    it('should call subscriptionsAdd', () => {
      let subscriptionsAddSpy = jest.spyOn(component, 'subscriptionsAdd');
      component.ngOnInit();
      expect(subscriptionsAddSpy).toHaveBeenCalled();
    })
  })

  describe('signIn/logIn modes', () => {
    describe('signInMode', () => {

      it('should call signIn', () => {
        let signInSpy = jest.spyOn(component, 'signIn');
        component.isInLogInMode = false;
        component.formSubmit();
        expect(signInSpy).toHaveBeenCalled();
      })

      it('should NOT call signIn', () => {
        let signInSpy = jest.spyOn(component, 'signIn');
        component.isInLogInMode = true;
        component.formSubmit();
        expect(signInSpy).not.toHaveBeenCalled();
      })
    })

    describe('logInMode', () => {
      it('should call logIn', () => {
        let logInSpy = jest.spyOn(component, 'logIn');
        component.isInLogInMode = true;
        component.formSubmit();
        expect(logInSpy).toHaveBeenCalled();
      })

      it('should NOT call logIn', () => {
        let logInSpy = jest.spyOn(component, 'logIn');
        component.isInLogInMode = false;
        component.formSubmit();
        expect(logInSpy).not.toHaveBeenCalled();
      })
    })


  })

  describe('onSwitch', () => {
    describe('isInLogin value change', () => {
      it('should change isInLogin value to true', () => {
        component.isInLogInMode = false;
        component.onSwitch();
        expect(component.isInLogInMode).toEqual(true);
      })
    })

    describe('Button text check', () => {
      describe('displaying text check in logIn mode ', () => {
        it(`should display 'sign in' in logIn mode`, () => {
          component.isInLogInMode = false;
          component.onSwitch();
          expect(component.switchButtonText).toEqual('sign in')
        })
      })
      describe(`displaying text check in logIn mode`, () => {
        it(`should display 'log in' in signIn mode`, () => {
          component.isInLogInMode = true;
          component.onSwitch();
          expect(component.switchButtonText).toEqual('log in')
        })
      })
    })


  })

  describe('LogIn', () => {
    it(`should set propety to true`, () => {
      component.logIn();
      expect(component.checkBool).toEqual(true);
    })
    it('should set cookies', () => {
      component.logIn();
      expect(cookieService.get('token')).toEqual('123');
      expect(cookieService.get('userName')).toEqual('testUser');
      expect(cookieService.get('userId')).toEqual('123');
    })
    it('should redirect you to main page', () => {
      component.logIn();
      expect(router.navigate).toHaveBeenCalled();
    })
    it('should open error snackbar on login failure', () => {
      authApiService.login = jest.fn().mockReturnValue(of({}));
      component.logIn();
      expect(snackbarMock.open).toHaveBeenCalled();
    })
  })

  describe('signIn', () => {
    it('should open snackbar with success message on success', () => {
      component.signIn();
      expect(snackbarMock.open).toHaveBeenCalled();
    })
    it('should open snackbar with error message on success', () => {
      authApiService.register = jest.fn().mockReturnValue(of({
        registerSuccess: false
      }))
      component.signIn();
      expect(snackbarMock.open).toHaveBeenCalled();
    })
  })
});
