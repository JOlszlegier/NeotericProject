import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

import {CenterBoxService} from "../../../../core/services/center-box-service";
import {GroupService} from "../../../../core/services/group-service";
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {Expenses} from "../../../../core/interfaces/interfaces";
import {UserBalanceService} from "../../../../core/services/user-balance-service";


@Component({
  selector: 'app-view-choice',
  templateUrl: './view-choice.component.html',
  styleUrls: ['./view-choice.component.scss']
})
export class ViewChoiceComponent implements OnInit, OnDestroy {
  constructor(private centerBoxService: CenterBoxService, private groupService: GroupService,
              private authApiService: AuthApiService, private cookieService: CookieService, private userBalanceService: UserBalanceService) {
  }

  public selectedCenterBoxView: string = '';
  public selectedSubscription: Subscription = new Subscription();
  public selected$ = this.centerBoxService.selectedSource.asObservable();
  public expensesArrayPlus$ = this.groupService.expensesArrayPlusSource.asObservable();
  public expensesArrayMinus$ = this.groupService.expensesArrayMinusSource.asObservable();
  public expensesArrayPlus: Expenses[] = [{description: '1', amount: 0}];
  public expensesArrayMinus: Expenses[] = [{description: '1', amount: 0}]

  public ngOnInit(): void {
    this.selected$.subscribe(selected => this.selectedCenterBoxView = selected)
    this.expensesArrayPlus$.subscribe(expensesArray => this.expensesArrayPlus = expensesArray);
    this.expensesArrayMinus$.subscribe(expensesArray => this.expensesArrayMinus = expensesArray);
  }

  public ngOnDestroy(): void {
    this.selectedSubscription.unsubscribe();
  }


  public onClick(selected: string): void {

    this.groupService.changeSearch([]);
    this.groupService.expensesArrayPlusSource.next([]);
    this.groupService.expensesArrayMinusSource.next([]);

    if (this.selectedCenterBoxView != 'Location') {
      this.centerBoxService.onChangeSelected(selected);

      const balanceUpdateSub = this.authApiService.balanceCheck(Number(this.cookieService.get('userId')), selected).subscribe(data => {
        this.userBalanceService.onValuesChange(data.income, data.outcome);
      })

      const expensesSubPlus = this.authApiService.expensesInfoPlus(this.cookieService.get('userId'), this.selectedCenterBoxView).subscribe(data => {
        this.expensesArrayPlus.splice(0, this.expensesArrayPlus.length);
        for (let expense in data.transactionInfo) {
          this.expensesArrayPlus.push(data.transactionInfo[expense]);
        }
        this.groupService.expensesArrayPlusSource.next(this.expensesArrayPlus);
      })

      const expensesSubMinus = this.authApiService.expensesInfoMinus(this.cookieService.get('userId'), this.selectedCenterBoxView).subscribe(data => {
        this.expensesArrayMinus.splice(0, this.expensesArrayMinus.length);
        for (let expense in data.transactionInfo) {
          this.expensesArrayMinus.push(data.transactionInfo[expense]);
        }
        this.groupService.expensesArrayMinusSource.next(this.expensesArrayMinus);
      })


      this.selectedSubscription.add(expensesSubMinus);
      this.selectedSubscription.add(expensesSubPlus);
    }
    this.centerBoxService.onChangeSelected(selected);
  }
}
