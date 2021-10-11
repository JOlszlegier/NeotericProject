import {Component, OnInit} from '@angular/core';
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {

  public expensesArrayPlus: [{ description: string, amount: number }] = [{description: '1', amount: 0}]
  public expensesArrayMinus: [{ description: string, amount: number }] = [{description: '1', amount: 0}]
  public subscription: Subscription = new Subscription;

  constructor(private authApiService: AuthApiService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    const expensesSubPlus = this.authApiService.expensesInfoPlus(this.cookieService.get('userId')).subscribe(data => {
      this.expensesArrayPlus.splice(0, 1);
      for (let expense in data.expensesArray) {
        this.expensesArrayPlus.push(data.expensesArray[expense]);
      }
    })

    const expensesSubMinus = this.authApiService.expensesInfoMinus(this.cookieService.get('userId')).subscribe(data => {
      this.expensesArrayMinus.splice(0, 1);
      for (let expense in data.expensesArray) {
        this.expensesArrayMinus.push(data.expensesArray[expense]);
      }
    })

    this.subscription.add(expensesSubMinus);
    this.subscription.add(expensesSubPlus);
  }


}
