import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

import {canExtend, splitByPercent, splitEvenly} from "./shared/expense-divide-helper";
import {CurrencyInfoApiService} from "../../../../core/services/currency-info-api-service";
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {UserBalanceService} from "../../../../core/services/user-balance-service";
import {CenterBoxService} from "../../../../core/services/center-box-service";
import {GroupService} from "../../../../core/services/group-service";
import {SnackbarEnums} from "../../../shared/snackbar-enums";
import {Expenses} from "../../../../core/interfaces/interfaces";

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
  public hideDelay = 50;
  public showDelay = 100;
  public expenseValue: number = 0;
  public eachUserAmount: number[] = [];
  public splitSelected: boolean = false;
  public currencyChoice: string = 'PLN';
  private subscriptions = new Subscription();
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
  public groupName$ = this.centerBoxService.selectedSource.asObservable();
  public groupName: string = '';
  public expensesArrayPlus$ = this.groupService.expensesArrayPlusSource.asObservable();
  public expensesArrayMinus$ = this.groupService.expensesArrayMinusSource.asObservable();
  public expensesArrayPlus: Expenses[] = [{description: '1', amount: 0}]
  public expensesArrayMinus: Expenses[] = [{description: '1', amount: 0}]
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public eachUserExpenseSum: number = 0;
  public defaultWidth: string = '450px';
  public payerSelectWidth: string = '600px';
  public divideWidth: string = '750px';
  public isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.outerHeight < 700;
    if (this.isMobile) {
      this.dialogRef.updateSize('250px', '400px');
    }
  }

  constructor(public dialogRef: MatDialogRef<AddExpenseComponent>,
              private http: HttpClient, private currencyApiService: CurrencyInfoApiService,
              private cookieService: CookieService, private authApiService: AuthApiService,
              private userBalanceService: UserBalanceService,
              private centerBoxService: CenterBoxService, private groupService: GroupService,
              private snackBar: MatSnackBar) {
  }

  public ngOnInit(): void {
    this.dialogRef.updateSize(this.defaultWidth, '');
    this.users.push(this.cookieService.get('userName'));
    const groupNameSub = this.groupName$.subscribe(selectedGroup => this.groupName = selectedGroup);
    this.subscriptions.add(groupNameSub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value === this.users[0]) {
      this.openErrorSnackBar(SnackbarEnums.AddExpensesAddingYourself);
    } else if (value) {
      this.users.push(value);
      this.eachUserAmount.push(0);
    }
    this.eachUserAmount = [];
    if (value && value != this.users[0]) {
      this.checkUser(value, event);
    }
  }

  public remove(user: string): void {
    const index = this.users.indexOf(user);
    if (index > 0) {
      this.users.splice(index, 1);
    }
  }

  public payerSelect(): void {
    this.isUserBoxVisible = !this.isUserBoxVisible;
    if (this.isDivideBoxVisible) this.isDivideBoxVisible = false;
    if (this.isUserBoxVisible) {
      this.dialogRef.updateSize(this.payerSelectWidth, '');
    } else {
      this.dialogRef.updateSize(this.defaultWidth, '');
    }
  }

  public divideSelect(): void {
    if (this.users.length > 2) {
      this.splitSelected = true;
    }
    this.isDivideBoxVisible = !this.isDivideBoxVisible;
    if (this.isUserBoxVisible) this.isUserBoxVisible = false;
    if (this.isDivideBoxVisible) {
      this.dialogRef.updateSize(this.divideWidth, '');
    } else {
      this.dialogRef.updateSize(this.defaultWidth, '');
    }
  }

  public userSelect(user: string): void {
    this.whoPaid = user;
    this.dialogRef.updateSize(this.defaultWidth, '');
    this.isUserBoxVisible = false;
  }


  public divideEven(): void {
    this.inputValueVisible = false;
    this.inputPercentVisible = false;
    for (let i = 0; i < this.users.length; i++) {
      this.eachUserAmount[i] = splitEvenly(this.users.length, this.expenseValue)
    }
    this.eachUserExpenseSum = this.eachUserAmount.reduce((a, b) => a + b, 0);
  }

  public divideByPercent(): void {
    for (let i = 0; i < this.users.length; i++) {
      if (this.percentToDivide[i])
        this.eachUserAmount[i] = splitByPercent(this.percentToDivide[i], this.expenseValue)
    }
    this.percentagesLeftCalculation();
    this.eachUserExpenseSum = this.eachUserAmount.reduce((a, b) => a + b, 0);

  }

  public canExtend(): boolean {
    return canExtend(this.users, this.expenseValue)
  }

  public divideByPercentView(): void {
    this.eachUserAmount = [];
    this.inputValueVisible = false;
    this.inputPercentVisible = true;
  }

  public divideByValues(index: number): void {
    this.eachUserAmount[index] = this.valueToDivide[index];
    this.AmountLeftCalculation();
  }

  public divideByValuesView(): void {
    this.eachUserAmount = [];
    this.inputValueVisible = true;
    this.inputPercentVisible = false;
  }

  public splitExpenseSelected(): void {
    this.splitSelected = true;
    this.theyOweSelected = false;
  }

  public theyOweYouSelected(): void {
    this.inputValueVisible = false;
    this.inputPercentVisible = false;
    if (this.whoPaid === this.users[0]) {
      this.eachUserAmount[1] = this.expenseValue;
      this.eachUserAmount[0] = 0;
    } else {
      this.eachUserAmount[0] = this.expenseValue;
      this.eachUserAmount[1] = 0;
    }
    this.splitSelected = false;
    this.theyOweSelected = true;
    this.eachUserExpenseSum = this.eachUserAmount.reduce((a, b) => a + b, 0);
  }

  public percentagesLeftCalculation(): void {
    this.percentagesLeft = 100 - this.percentToDivide.reduce((acc, cur) => acc + cur, 0);
    this.eachUserExpenseSum = this.eachUserAmount.reduce((a, b) => a + b, 0);
  }

  public AmountLeftCalculation(): void {
    this.valueLeft = this.expenseValue - this.valueToDivide.reduce((acc, cur) => acc + cur, 0);
    this.eachUserExpenseSum = this.eachUserAmount.reduce((a, b) => a + b, 0);
  }

  public checkUser(friend: string, event: MatChipInputEvent): void {
    const checkUserSub = this.authApiService.isInFriendList(this.cookieService.get('userId'), friend, this.groupName).subscribe(data => {
      this.correctFriend = data.correctUser;
      if (!this.correctFriend) {
        this.users.splice(this.users.indexOf(friend), 1);
        this.openErrorSnackBar(SnackbarEnums.AddExpenseIncorrectUser)
      }
      if (data.correctUser) {
        event.chipInput?.clear();
      }
    })
    this.subscriptions.add(checkUserSub);
  }

  public sendInfo(): void {

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
        value: Number((this.eachUserAmount[value] * this.currencyMultiplier).toFixed(2))
      };
    }
    const addExpenseSub = this.authApiService.addExpense(this.finalExpenseForUser, this.whoPaid,
      this.description, this.groupName).subscribe(() => {
      this.updateBalance();
      this.openSuccessSnackBar(SnackbarEnums.AddExpenseSuccess);
    })
    this.subscriptions.add(addExpenseSub);

  }

  updateBalance(): void {
    const balanceUpdateSub = this.authApiService.balanceCheck(this.cookieService.get('userId')).subscribe(data => {
      this.userBalanceService.onValuesChange(data.income, data.outcome);
      this.updateList();
    })
    this.subscriptions.add(balanceUpdateSub);
  }

  updateList(): void {
    this.expensesArrayMinus$.subscribe(array => this.expensesArrayMinus = array);
    this.expensesArrayPlus$.subscribe(array => this.expensesArrayPlus = array);
    this.expensesArrayPlus = [];
    this.expensesArrayMinus = [];

    const expensesSubPlus = this.authApiService.expensesInfoPlus(this.cookieService.get('userId'), this.groupName).subscribe(data => {
      this.expensesArrayPlus.splice(0, this.expensesArrayPlus.length);
      for (let expense in data.expensesArray) {
        this.expensesArrayPlus.push(data.expensesArray[expense]);
      }
      this.groupService.expensesArrayPlusSource.next(this.expensesArrayPlus);
    })

    const expensesSubMinus = this.authApiService.expensesInfoMinus(this.cookieService.get('userId'), this.groupName).subscribe(data => {
      this.expensesArrayMinus.splice(0, this.expensesArrayMinus.length);
      for (let expense in data.expensesArray) {
        this.expensesArrayMinus.push(data.expensesArray[expense]);
      }
      this.groupService.expensesArrayMinusSource.next(this.expensesArrayMinus);
      this.dialogRef.close();
    })
    this.subscriptions.add(expensesSubMinus);
    this.subscriptions.add(expensesSubPlus);
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      panelClass: ['add-expense-error-snackbar'],
      verticalPosition: "bottom",
      duration: 3000
    })
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      panelClass: ['add-expense-success-snackbar'],
      verticalPosition: "top",
      horizontalPosition: "left",
      duration: 3000
    })
  }
}
