import {of} from "rxjs";

export class AuthApiServiceMock {
  login() {
    return of({
      token: '123',
      passwordCorrect: true,
      expirationDate: 123,
      userId: '123',
      userName: 'testUser'
    });
  }

  register() {
    return of({
      token: '123',
      registerSuccess: true
    });
  }
}

export class CookieServiceMock {
  cookieState = {} as any;

  get(key: string) {
    return this.cookieState[key]
  }

  set(key: string, value: string) {
    this.cookieState[key] = value;
  }
}

export const snackbarMock = {
  openFromComponent: jest.fn(),
  open: jest.fn(),
  dismiss: jest.fn()
}
