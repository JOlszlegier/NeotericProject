import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

import {MobileViewService} from "../../../core/services/mobile-view-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  public mobileView$ = this.mobileViewService.viewSelected.asObservable();
  public mobileView: boolean = false;
  public subscription: Subscription = new Subscription();

  constructor(private router: Router, private cookieService: CookieService, private mobileViewService: MobileViewService) {
  }

  public onLogout(): void {
    this.subscription = this.mobileView$.subscribe(state => this.mobileView = state);
    this.router.navigate(['']);
    this.cookieService.deleteAll();
  }

  public onMobileView(): void {
    this.mobileView = !this.mobileView;
    this.mobileViewService.viewSelected.next(this.mobileView);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
