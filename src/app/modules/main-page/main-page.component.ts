import {Component, OnInit} from '@angular/core';

import {MobileViewService} from "../../core/services/mobile-view-service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public mobileView$ = this.mobileViewService.viewSelected.asObservable();
  public mobileView: boolean = false;


  ngOnInit() {
    this.mobileView$.subscribe(state => this.mobileView = state);
  }

  constructor(private mobileViewService: MobileViewService) {
  }
}
