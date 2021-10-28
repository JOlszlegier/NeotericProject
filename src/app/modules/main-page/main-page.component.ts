import {Component, OnDestroy, OnInit} from '@angular/core';

import {MobileViewService} from "../../core/services/mobile-view-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public mobileView$ = this.mobileViewService.viewSelected.asObservable();
  public mobileView: boolean = false;
  public subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.subscriptions = this.mobileView$.subscribe(state => this.mobileView = state);
  }

  constructor(private mobileViewService: MobileViewService) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
