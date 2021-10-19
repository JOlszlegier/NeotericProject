import {AuthPageComponent} from "./auth-page.component";
import {AuthService} from "../../core/services/auth-service";
import {FormBuilder} from "@angular/forms";
import {AuthApiService} from "../../core/services/auth-api-service";
import {CookieService} from "ngx-cookie-service";
import {CurrencyInfoApiService} from "../../core/services/currency-info-api-service";
import {Subscription} from "rxjs";

describe('AuthPageComponent', () => {
  let fixture: AuthPageComponent;
  let authServiceMock: AuthService;
  let fbMock: FormBuilder;
  let authApiMock: AuthApiService;
  let cookieServiceMock: CookieService;
  let currencyApiMock: CurrencyInfoApiService;

  beforeEach(() => {
    fixture = new AuthPageComponent(
      authServiceMock,
      fbMock,
      authApiMock,
      cookieServiceMock,
      currencyApiMock
    );

    fixture.defaultForm = fbMock.group({
      email: [''],
      password: [''],
    });
    fixture.subscriptions = new Subscription();
  })

  describe('Setup component', () => {
    describe('ngOnInit', () => {
      it('should add currencySub to subscriptions', () => {
        const subscriptionsSubSpy = jest.spyOn(fixture, 'subscriptionsAdd');
        const currencySub: Subscription = new Subscription();

        fixture.currencySub = currencySub;
        fixture.ngOnInit();

        expect(subscriptionsSubSpy).toHaveBeenCalledWith(currencySub);

      })
    });
  });
})
