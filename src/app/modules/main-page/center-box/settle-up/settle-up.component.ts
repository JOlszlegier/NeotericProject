import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrls: ['./settle-up.component.scss']
})
export class SettleUpComponent implements OnInit {
  public subscriptions!: Subscription;
  public whoYouOweTo: [string] = ['']
  public amountYouOweTo: [number] = [0];

  constructor(private cookieService: CookieService, private authApiService: AuthApiService) {
  }

  ngOnInit(): void {
    const settleUpInfoSub = this.authApiService.settleUpInfo(this.cookieService.get('userId')).subscribe(data => {
      this.whoYouOweTo = data.userNames;
      for (const user in data.valueOwedToUser)
        this.amountYouOweTo[user] = data.valueOwedToUser[user].value;
    })
    this.subscriptions.add(settleUpInfoSub);
  }
}
