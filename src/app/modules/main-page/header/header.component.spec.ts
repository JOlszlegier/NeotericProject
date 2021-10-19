import {HeaderComponent} from "./header.component";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

describe('Logout function', () => {
  let fixture: HeaderComponent;
  let routerMock: Router;
  let cookieServiceMock: CookieService;


  beforeEach(() => {
    fixture = new HeaderComponent(
      routerMock, cookieServiceMock
    );

  })

  describe('Router change', () => {
    it(`should launch router `, () => {
      fixture.onLogout();
      expect(routerMock.navigate).toHaveBeenCalledTimes(1);
    })
  })


})
