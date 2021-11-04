import {Injectable, Injector} from "@angular/core";
import {HttpInterceptor} from "@angular/common/http";


import {CookieService} from "ngx-cookie-service";

@Injectable({providedIn: "root"})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private cookieService: CookieService) {
  }

  public getToken(): string {
    return this.cookieService.get('token');
  }

  intercept(req: any, next: any) {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }

}
