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


describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthPageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule, MatSnackBarModule],
      providers: [
        {provide: AuthApiService},
        {provide: CookieService},
        {provide: CurrencyInfoApiService},
        {provide: MatSnackBar}
      ]
    })
      .compileComponents();
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

});
