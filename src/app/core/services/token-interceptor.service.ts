import {Injectable, Injector} from "@angular/core";
import {HttpInterceptor} from "@angular/common/http";
import {TokenAuth} from "./token-auth";

@Injectable({providedIn: "root"})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: any, next: any) {
    let tokenAuth = this.injector.get(TokenAuth);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenAuth.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }

}
