import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef} from "@angular/material/dialog";
import {ExpenseDivideService} from "../../../../core/services/expense-divide-service";
import {HttpClient} from "@angular/common/http";
import {euroCurrencyService} from "../../../../core/services/euro-currency-service";
import {Subscription} from "rxjs";
import {dollarCurrencyService} from "../../../../core/services/dollar-currency-service";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  public addOnBlur: boolean = true;
  public selectable: boolean = true;
  public removable: boolean = true;
  public users: string[] = []
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
  public showDelay = new FormControl(100);
  public hideDelay = new FormControl(50);
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
              private expenseDivisionService: ExpenseDivideService,
              private http: HttpClient, private euroService: euroCurrencyService,
              private dollarService: dollarCurrencyService) {
  }

  ngOnInit() {
    this.dialogRef.updateSize('300px', '');
    this.subscriptions = this.euroService.euroState.subscribe(state => this.plnToEur = state);
    this.subscriptions = this.dollarService.dollarState.subscribe(state => this.plnToUSD = state);
    this.http.get('http://api.exchangeratesapi.io/v1/latest?access_key=6ad942ce3abac5d14a21235d48f68e2a&symbols=USD,PLN&format=1')
      .subscribe(responseData => {
        this.euroService.euroOnChange(Object.values(responseData)[4].PLN);
        this.dollarService.dollarOnChange(Object.values(responseData)[4].PLN / Object.values(responseData)[4].USD);
      })
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

  //FOR TEST PURPOSES

  apiDisplay() {
    console.log('Euro exchange rate passed by service ' + this.plnToEur);
    console.log('Dollar exchange rate passed by service ' + this.plnToUSD);
    this.exportInfoTest();
  }

  //this section will need changes after backend delivers
  divideEven() {
    this.inputValueVisible = false;

    this.inputPercentVisible = false;
    for (let i = 0; i < this.users.length; i++) {
      this.eachUserAmount[i] = this.expenseDivisionService.splitEvenly(this.users.length, this.expenseValue)
    }
  }

  divideByPercent() {
    this.inputValueVisible = false;
    this.inputPercentVisible = true;
    for (let i = 0; i < this.users.length; i++) {
      if (this.percentToDivide[i])
        this.eachUserAmount[i] = this.expenseDivisionService.splitByPercent(this.percentToDivide[i], this.expenseValue)
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
    console.log(this.currencyChoice);
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

  ///////


  exportInfoTest() {
    console.log(`Users ` + this.users);
    console.log(`Value ` + this.expenseValue);
    console.log('Description ' + this.description);
    console.log('Currency ' + this.currencyChoice);
    console.log('How to divide ' + this.eachUserAmount);

  }

}
