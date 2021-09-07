import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef} from "@angular/material/dialog";
import {ExpenseDivideService} from "../../../../core/services/expense-divide-service";
import {HttpClient} from "@angular/common/http";
import {euroCurrencyService} from "../../../../core/services/euro-currency-service";
import {Subscription} from "rxjs";
import {dollarCurrencyService} from "../../../../core/services/dollar-currency-service";


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

  splitExpenseSelected() {
    this.splitSelected = true;
  }

  //api check

  apiDisplay() {
    console.log('Euro exchange rate passed by service ' + this.plnToEur);
    console.log('Dollar exchange rate passed by service ' + this.plnToUSD);
  }

  //this section will need changes after backend delivers
  divideEven() {
    for (let i = 0; i < this.users.length; i++) {
      this.eachUserAmount[i] = this.expenseDivisionService.splitEvenly(this.users.length, this.expenseValue)
    }
  }

  theyOweYouSelected() {
    this.eachUserAmount[0] = this.expenseValue;
    this.eachUserAmount[1] = 0;
    this.splitSelected = false;
    console.log(this.currencyChoice);
  }

  youOweThemSelected() {
    this.eachUserAmount[1] = this.expenseValue;
    this.eachUserAmount[0] = 0;
    this.splitSelected = false;
  }

  ///////

}
