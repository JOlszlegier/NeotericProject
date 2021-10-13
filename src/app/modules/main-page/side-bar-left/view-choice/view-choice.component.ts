import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from "rxjs";
import {CenterBoxService} from "../../../../core/services/center-box-service";
import {GroupService} from "../../../../core/services/group-service";
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-view-choice',
  templateUrl: './view-choice.component.html',
  styleUrls: ['./view-choice.component.scss']
})
export class ViewChoiceComponent implements OnInit, OnDestroy {
  constructor(private centerBoxService: CenterBoxService, private groupService: GroupService,
              private authApiService: AuthApiService, private cookieService: CookieService) {
  }

  public selectedCenterBoxView: string = '';
  public selectedSubscription: Subscription = new Subscription();
  public selected$ = this.centerBoxService.selectedSource.asObservable();
  public expensesArrayPlus$ = this.groupService.expensesArrayPlusSource.asObservable();
  public expensesArrayMinus$ = this.groupService.expensesArrayMinusSource.asObservable();
  public expensesArrayPlus: [{ description: string, amount: number }] = [{description: '1', amount: 0}]
  public expensesArrayMinus: [{ description: string, amount: number }] = [{description: '1', amount: 0}]

  public ngOnInit(): void {
    this.selected$.subscribe(selected => this.selectedCenterBoxView = selected)
    this.expensesArrayPlus$.subscribe(expensesArray => this.expensesArrayPlus = expensesArray);
    this.expensesArrayMinus$.subscribe(expensesArray => this.expensesArrayMinus = expensesArray);
  }

  public ngOnDestroy(): void {
    this.selectedSubscription.unsubscribe();
  }


  onClick(selected: string): void {
    this.expensesArrayMinus.splice(0, this.expensesArrayMinus.length);
    this.expensesArrayPlus.splice(0, this.expensesArrayPlus.length);
    this.centerBoxService.onChangeSelected(selected);
    const expensesSubPlus = this.authApiService.expensesInfoPlus(this.cookieService.get('userId'), this.selectedCenterBoxView).subscribe(data => {
      for (let expense in data.expensesArray) {
        this.expensesArrayPlus.push(data.expensesArray[expense]);
      }
    })

    const expensesSubMinus = this.authApiService.expensesInfoMinus(this.cookieService.get('userId'), this.selectedCenterBoxView).subscribe(data => {

      for (let expense in data.expensesArray) {
        this.expensesArrayMinus.push(data.expensesArray[expense]);
      }
    })

    this.selectedSubscription.add(expensesSubMinus);
    this.selectedSubscription.add(expensesSubPlus);
  }
}
