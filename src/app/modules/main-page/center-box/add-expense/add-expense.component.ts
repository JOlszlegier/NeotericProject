import {Component, OnDestroy, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

import {Subscription} from "rxjs";
import {splitByPercent, splitEvenly} from "./shared/expense-divide-helper";
import {CurrencyInfoService} from "../../../../core/services/currency-info-service";
import {CurrencyInfoApiService} from "../../../../core/services/currency-info-api-service";
import {CookieService} from "ngx-cookie-service";
import {AuthApiService} from "../../../../core/services/auth-api-service";

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
  public whoPaid: string = 'who?';
  public howToDivide: string = 'how?';
  public expenseValue: number = 0;
  public eachUserAmount: number[] = [];
  public splitSelected: boolean = false;
  public currencyChoice: string = 'PLN';
  private subscriptions!: Subscription;
  public showDelay = 100;
  public hideDelay = 50;
  public currencyMultiplier: number = 1;
  public theyOweSelected: boolean = false;
  public inputPercentVisible: boolean = false;
  public inputValueVisible: boolean = false;
  public percentToDivide: number[] = [];
  public percentagesLeft: number = 0;
  public valueLeft: number = 0;
  public valueToDivide: number[] = [];
  public description: string = '';
  public finalExpenseForUser: [{ from: string, value: number }] = [{from: '', value: 0}];
  public correctFriend: boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const

  constructor(public dialogRef: MatDialogRef<AddExpenseComponent>,
              private http: HttpClient, private currencyInfo: CurrencyInfoService,
              private currencyApiService: CurrencyInfoApiService,
              private cookieService: CookieService, private authApiService: AuthApiService) {
  }

  ngOnInit() {
    this.dialogRef.updateSize('300px', '');
    this.users.push(this.cookieService.get('userName'));
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
    this.eachUserAmount = [];
    if (value) {
      this.checkUser(value);
    }
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);
    if (index > 0) {
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
    if (this.users.length > 2) {
      this.splitSelected = true;
    }
    this.isDivideBoxVisible = !this.isDivideBoxVisible;
    if (this.isUserBoxVisible) this.isUserBoxVisible = false;
    if (this.isDivideBoxVisible) {
      this.dialogRef.updateSize('600px', '');
    } else {
      this.dialogRef.updateSize('300px', '');
    }
  }

  userSelect(user: string) {
    this.whoPaid = user;
    this.dialogRef.updateSize('300px', '');
    this.isUserBoxVisible = false;
  }

  canExtend(users: string[]) {
    return (users.length > 1 && this.expenseValue !== 0);
  }


  divideEven() {
    this.inputValueVisible = false;
    this.inputPercentVisible = false;
    for (let i = 0; i < this.users.length; i++) {
      this.eachUserAmount[i] = splitEvenly(this.users.length, this.expenseValue)
    }
  }

  divideByPercent() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.percentToDivide[i])
        this.eachUserAmount[i] = splitByPercent(this.percentToDivide[i], this.expenseValue)
    }
    this.percentagesLeftCalculation();
  }

  divideByPercentView() {
    this.eachUserAmount = [];
    this.inputValueVisible = false;
    this.inputPercentVisible = true;
  }

  divideByValues(index: number) {
    this.eachUserAmount[index] = this.valueToDivide[index];
    this.AmountLeftCalculation();
  }

  divideByValuesView() {
    this.eachUserAmount = [];
    this.inputValueVisible = true;
    this.inputPercentVisible = false;
  }

  splitExpenseSelected() {
    this.splitSelected = true;
    this.theyOweSelected = false;
  }

  theyOweYouSelected() {
    this.inputValueVisible = false;
    this.inputPercentVisible = false;
    this.eachUserAmount[1] = this.expenseValue;
    this.eachUserAmount[0] = 0;
    this.splitSelected = false;
    this.theyOweSelected = true;
  }

  percentagesLeftCalculation() {
    this.percentagesLeft = 100 - this.percentToDivide.reduce((acc, cur) => acc + cur, 0)
  }

  AmountLeftCalculation() {
    this.valueLeft = this.expenseValue - this.valueToDivide.reduce((acc, cur) => acc + cur, 0)
  }

  checkUser(friend: string) {
    const checkUserSub = this.authApiService.checkUser(this.cookieService.get('userId'), friend).subscribe(data => {
      this.correctFriend = data.correctUser
    })
    this.subscriptions.add(checkUserSub);
  }

  sendInfo() {

    if (this.currencyChoice === 'EUR') {
      this.currencyMultiplier = Number(this.cookieService.get('PLNtoEur'))
    } else if (this.currencyChoice === 'USD') {
      this.currencyMultiplier = Number(this.cookieService.get('PLNtoUSD'))
    } else if (this.currencyChoice === 'PLN') {
      this.currencyMultiplier = 1;
    }
    const payerIndex = this.users.indexOf(this.whoPaid)
    this.users.splice(payerIndex, 1);
    this.eachUserAmount.splice(payerIndex, 1);

    for (const value in this.eachUserAmount) {

      this.finalExpenseForUser[value] = {
        from: this.users[value],
        value: Number((this.eachUserAmount[value] * this.currencyMultiplier).toPrecision(4))
      };
    }
    const addExpenseSub = this.authApiService.singleExpenseAdd(this.finalExpenseForUser, this.whoPaid,
      this.description).subscribe(data => {
      this.dialogRef.close();
    })

    this.subscriptions.add(addExpenseSub);

  }
}
