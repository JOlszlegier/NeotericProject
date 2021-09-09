import {Component, OnDestroy, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

import {Subscription} from "rxjs";
import {splitByPercent, splitEvenly} from "./shared/expense-divide-helper";
import {CurrencyInfoService} from "../../../../core/services/currency-info-service";
import {CurrencyInfoApiService} from "../../../../core/services/currency-info-api-service";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  public addOnBlur: boolean = true;
  public selectable: boolean = true;
  public removable: boolean = true;
  public users: string[] = [];
  public isUserBoxVisible: boolean = false;
  public isDivideBoxVisible: boolean = false;
  public whoPays: string = 'you';
  public howToDivide: string = 'even';
  public expenseValue: number = 0;
  public eachUserAmount: number[] = [];
  public splitSelected: boolean = false;
  public currencyChoice: string = 'PLN';
  private subscriptions!: Subscription;
  private plnToEur: number = 0;
  private plnToUSD: number = 0;
  public showDelay = 100;
  public hideDelay = 50;
  public theyOweSelected: boolean = false;
  public youOweSelected: boolean = false;
  public inputPercentVisible: boolean = false;
  public inputValueVisible: boolean = false;
  public percentToDivide: number[] = [];
  public percentagesLeft: number = 0;
  public valueLeft: number = 0;
  public valueToDivide: number[] = [];
  public description: string = '';

  readonly separatorKeysCodes = [ENTER, COMMA] as const

  constructor(public dialogRef: MatDialogRef<AddExpenseComponent>,
              private http: HttpClient, private currencyInfo: CurrencyInfoService, private currencyApiService: CurrencyInfoApiService) {
  }

  ngOnInit() {
    this.dialogRef.updateSize('300px', '');
    this.subscriptions = this.currencyInfo.euroState.subscribe(state => this.plnToEur = state);
    this.subscriptions = this.currencyInfo.dollarState.subscribe(state => this.plnToUSD = state);
    this.subscriptions = this.currencyApiService.getCurrencyInfoFromApi().subscribe(responseData => {
      this.currencyInfo.euroOnChange(Object.values(responseData)[4].PLN);
      this.currencyInfo.dollarOnChange(Object.values(responseData)[4].PLN / Object.values(responseData)[4].USD);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.users.push(value);
      this.eachUserAmount.push(0);
    }
    event.chipInput!.clear();
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  payerSelect() {
    this.isUserBoxVisible = !this.isUserBoxVisible;
    if (this.isDivideBoxVisible) this.isDivideBoxVisible = false;
    if (this.isUserBoxVisible) {
      this.dialogRef.updateSize('600px', '');
    } else {
      this.dialogRef.updateSize('300px', '');
    }
  }

  divideSelect() {
    this.isDivideBoxVisible = !this.isDivideBoxVisible;
    if (this.isUserBoxVisible) this.isUserBoxVisible = false;
    if (this.isDivideBoxVisible) {
      this.dialogRef.updateSize('600px', '');
    } else {
      this.dialogRef.updateSize('300px', '');
    }
  }

  userSelect(user: string) {
    this.whoPays = user;
    this.dialogRef.updateSize('300px', '');
    this.isUserBoxVisible = false;
  }

  canExtend(users: string[]) {
    return users.length > 0;
  }


  //this section will need changes after backend delivers
  divideEven() {
    this.inputValueVisible = false;

    this.inputPercentVisible = false;
    for (let i = 0; i < this.users.length; i++) {
      this.eachUserAmount[i] = splitEvenly(this.users.length, this.expenseValue)
    }
  }

  divideByPercent() {
    this.inputValueVisible = false;
    this.inputPercentVisible = true;
    for (let i = 0; i < this.users.length; i++) {
      if (this.percentToDivide[i])
        this.eachUserAmount[i] = splitByPercent(this.percentToDivide[i], this.expenseValue)
    }
    this.percentagesLeftCalculation();
  }

  divideByValues(index: number) {
    this.eachUserAmount[index] = this.valueToDivide[index];
    this.AmountLeftCalculation();
  }

  divideByValuesView() {
    this.inputValueVisible = true;
    this.inputPercentVisible = false;
  }

  splitExpenseSelected() {
    this.splitSelected = true;
    this.theyOweSelected = false;
    this.youOweSelected = false;
  }

  theyOweYouSelected() {
    this.inputPercentVisible = false;
    this.eachUserAmount[0] = this.expenseValue;
    this.eachUserAmount[1] = 0;
    this.splitSelected = false;
    this.theyOweSelected = true;
    this.youOweSelected = false;
  }

  youOweThemSelected() {
    this.inputPercentVisible = false;
    this.eachUserAmount[1] = this.expenseValue;
    this.eachUserAmount[0] = 0;
    this.splitSelected = false;
    this.theyOweSelected = false;
    this.youOweSelected = true;
  }

  percentagesLeftCalculation() {
    this.percentagesLeft = 100 - this.percentToDivide.reduce((acc, cur) => acc + cur, 0)
  }

  AmountLeftCalculation() {
    this.valueLeft = this.expenseValue - this.valueToDivide.reduce((acc, cur) => acc + cur, 0)
  }


}
