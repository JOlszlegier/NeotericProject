import {Component, OnInit} from '@angular/core';
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-cash-status',
  templateUrl: './cash-status.component.html',
  styleUrls: ['./cash-status.component.scss']
})
export class CashStatusComponent implements OnInit {
  public moneyTest: number[] = [-10, 2, 25]
  public subscriptions!: Subscription;
  public difference: number = 0;
  public outcome: number = 0;
  public income: number = 0;

  constructor(private authApiService: AuthApiService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    const balanceUpdateSub = this.authApiService.balanceCheck(this.cookieService.get('userId')).subscribe(data => {
      this.outcome = data.outcome;
      this.income = data.income;
      this.difference = this.income - this.outcome;
    })
    this.subscriptions.add(balanceUpdateSub);
  }

}
