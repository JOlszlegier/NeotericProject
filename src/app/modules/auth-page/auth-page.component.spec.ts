import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {AuthPageComponent} from './auth-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthApiService} from "../../core/services/auth-api-service";
import {CookieService} from "ngx-cookie-service";
import {CurrencyInfoApiService} from "../../core/services/currency-info-api-service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router} from "@angular/router";


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
        {provide: AuthApiService},
        {provide: CookieService},
        {provide: CurrencyInfoApiService},
        {provide: MatSnackBar},
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

  it('should create', () => {
    expect(component).toBeTruthy();
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

  // describe('LogIn', () => {
  //   it('should change boolean the user to main page if the input is correct', () => {
  //     component.logIn();
  //     authApiService.login = jest.fn().mockReturnValue({
  //       data: {
  //         passwordCorrect: true,
  //         token: '1234',
  //         expirationDate: 12,
  //         userId: 'Kuba',
  //         userName: 'Kubson'
  //       }
  //     });
  //     expect(component.checkBool).toEqual(true);
  //   })
  // })

});
