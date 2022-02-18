import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

import {AuthApiService} from "../../../../core/services/auth-api-service";
import {UserBalanceService} from "../../../../core/services/user-balance-service";
import {CenterBoxService} from "../../../../core/services/center-box-service";

@Component({
  selector: 'app-cash-status',
  templateUrl: './cash-status.component.html',
  styleUrls: ['./cash-status.component.scss']
})
export class CashStatusComponent implements OnInit, OnDestroy {
  public subscriptions = new Subscription();
  public difference: number = 0;
  public outcome: number = 0;
  public income: number = 0;
  public income$ = this.userBalanceService.incomeSource.asObservable();
  public outcome$ = this.userBalanceService.outcomeSource.asObservable();
  public difference$ = this.userBalanceService.differenceSource.asObservable();
  public groupName$ = this.centerBoxService.selectedSource.asObservable();
  public groupName: string = '';

  constructor(private authApiService: AuthApiService, private cookieService: CookieService,
              private userBalanceService: UserBalanceService, private centerBoxService: CenterBoxService) {
  }

  ngOnInit(): void {
    this.income$.subscribe(income => this.income = income);
    this.outcome$.subscribe(outcome => this.outcome = outcome);
    this.difference$.subscribe(difference => this.difference = difference);
    this.groupName$.subscribe(groupName => this.groupName = groupName);
    const balanceUpdateSub = this.authApiService.balanceCheck(Number(this.cookieService.get('userId')), this.groupName).subscribe(data => {
      this.userBalanceService.onValuesChange(data.income, data.outcome);
    })
    this.subscriptions.add(balanceUpdateSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
