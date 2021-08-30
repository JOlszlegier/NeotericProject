import {Component, OnDestroy, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

import {CashBoxService} from "../../../../core/services/cash-box-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  public addOnBlur: boolean = true;
  public selectable: boolean = true;
  public removable: boolean = true;
  public users: string[] = []

  private cashSubscription!: Subscription;
  private displayState: boolean = false;

  readonly separatorKeysCodes = [ENTER, COMMA] as const

  constructor(private cashService: CashBoxService) {
  }

  ngOnInit(): void {
    this.cashSubscription = this.cashService.displayState.subscribe(state => this.displayState = state)
  }

  ngOnDestroy(): void {
    this.cashSubscription.unsubscribe();
  }

  onClick(): void {
    this.cashService.onChangeDisplay(false);
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
