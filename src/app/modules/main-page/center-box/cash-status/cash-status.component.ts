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

  constructor(private authApiService: AuthApiService, private cookieService: CookieService,
              private userBalanceService: UserBalanceService) {
  }

  ngOnInit(): void {
    const incomeSub = this.userBalanceService.incomeSource.subscribe(income => this.income = income);
    const outcomeSub = this.userBalanceService.outcomeSource.subscribe(outcome => this.outcome = outcome);
    const differenceSub = this.userBalanceService.differenceSource.subscribe(difference => this.difference = difference)
    const balanceUpdateSub = this.authApiService.balanceCheck(this.cookieService.get('userId')).subscribe(data => {
      this.userBalanceService.onValuesChange(data.income, data.outcome);
    })
    this.subscriptions.add(balanceUpdateSub);
    this.subscriptions.add(incomeSub);
    this.subscriptions.add(outcomeSub);
    this.subscriptions.add(differenceSub);
  }

}
