import {Component, OnDestroy, OnInit} from '@angular/core';
import {CashBoxService} from "../../../../core/services/cash-box-service";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  private cashSubscription!: Subscription;
  private displayState: boolean = false;
  addOnBlur: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const
  users: string[] = []

  constructor(private cashService: CashBoxService) {
  }


  ngOnInit() {
    this.cashSubscription = this.cashService.displayState.subscribe(state => this.displayState = state)
  }

  ngOnDestroy() {
    this.cashSubscription.unsubscribe();
  }

  onClick() {
    this.displayState = !this.displayState
    this.cashService.onChangeDisplay(this.displayState)
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.users.push(value);
    }
    event.chipInput!.clear();
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

}
