import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

import {AuthApiService} from "../../../../core/services/auth-api-service";
import {CenterBoxService} from "../../../../core/services/center-box-service";
import {GroupService} from "../../../../core/services/group-service";
import {Expenses} from "../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {

  public expensesArrayPlus$ = this.groupService.expensesArrayPlusSource.asObservable();
  public expensesArrayMinus$ = this.groupService.expensesArrayMinusSource.asObservable();
  public expensesArrayPlus: Expenses[] = [{description: '1', amount: 0}]
  public expensesArrayMinus: Expenses[] = [{description: '1', amount: 0}]
  public subscription: Subscription = new Subscription;
  public groupName$ = this.centerBoxService.selectedSource.asObservable();
  public groupName: string = '';

  constructor(private authApiService: AuthApiService, private cookieService: CookieService,
              private centerBoxService: CenterBoxService, private groupService: GroupService) {
  }

  ngOnInit(): void {
    let groupNameSubscription = this.groupName$.subscribe(groupName => this.groupName = groupName);
    let expensesArrayPlusSub = this.expensesArrayPlus$.subscribe(expensesArray => this.expensesArrayPlus = expensesArray);
    let expensesArrayMinusSub = this.expensesArrayMinus$.subscribe(expensesArray => this.expensesArrayMinus = expensesArray);
    this.subscription.add(groupNameSubscription);
    this.subscription.add(expensesArrayPlusSub);
    this.subscription.add(expensesArrayMinusSub);
    this.expensesArrayPlus = [];
    this.expensesArrayMinus = [];
    const expensesSubPlus = this.authApiService.expensesInfoPlus(this.cookieService.get('userId'), this.groupName).subscribe(data => {
      if (data.transactionInfo !== this.expensesArrayPlus) {
        this.expensesArrayPlus.splice(0, 1);
        for (let expense in data.transactionInfo) {
          this.expensesArrayPlus.push(data.transactionInfo[expense]);
        }
      }
    })

    const expensesSubMinus = this.authApiService.expensesInfoMinus(this.cookieService.get('userId'), this.groupName).subscribe(data => {
      this.expensesArrayMinus.splice(0, 1);
      for (let expense in data.transactionInfo) {
        this.expensesArrayMinus.push(data.transactionInfo[expense]);
      }
    })


    this.subscription.add(expensesSubMinus);
    this.subscription.add(expensesSubPlus);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
