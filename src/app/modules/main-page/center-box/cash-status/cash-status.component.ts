import {Component, OnInit} from '@angular/core';
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {UserBalanceService} from "../../../../core/services/user-balance-service";

@Component({
  selector: 'app-cash-status',
  templateUrl: './cash-status.component.html',
  styleUrls: ['./cash-status.component.scss']
})
export class CashStatusComponent implements OnInit {
  public subscriptions = new Subscription();
  public difference: number = 0;
  public outcome: number = 0;
  public income: number = 0;
  public income$ = this.userBalanceService.incomeSource.asObservable();
  public outcome$ = this.userBalanceService.outcomeSource.asObservable();
  public difference$ = this.userBalanceService.differenceSource.asObservable();

  constructor(private authApiService: AuthApiService, private cookieService: CookieService,
              private userBalanceService: UserBalanceService) {
  }

  ngOnInit(): void {
    this.income$.subscribe(income => this.income = income);
    this.outcome$.subscribe(outcome => this.outcome = outcome);
    this.difference$.subscribe(difference => this.difference = difference);
    const balanceUpdateSub = this.authApiService.balanceCheck(this.cookieService.get('userId')).subscribe(data => {
      this.userBalanceService.onValuesChange(data.income, data.outcome);
    })
    this.subscriptions.add(balanceUpdateSub);
  }

}
