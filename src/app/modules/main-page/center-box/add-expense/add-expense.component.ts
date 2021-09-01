import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef} from "@angular/material/dialog";
import {ExpenseDivideService} from "../../../../core/services/expense-divide-service";

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

  readonly separatorKeysCodes = [ENTER, COMMA] as const

  constructor(public dialogRef: MatDialogRef<AddExpenseComponent>, private expenseDivisionService: ExpenseDivideService) {
  }

  ngOnInit() {
    this.dialogRef.updateSize('300px', '');
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

  //this section will need changes after backend delivers xd
  divideEven() {
    for (let i = 0; i < this.users.length; i++) {
      this.eachUserAmount[i] = this.expenseDivisionService.splitEvenly(this.users.length, this.expenseValue)
    }
  }

  theyOweYouSelected() {
    this.eachUserAmount[0] = this.expenseValue;
    this.eachUserAmount[1] = 0;
    this.splitSelected = false;
  }

  youOweThemSelected() {
    this.eachUserAmount[1] = this.expenseValue;
    this.eachUserAmount[0] = 0;
    this.splitSelected = false;
  }

  //

}
