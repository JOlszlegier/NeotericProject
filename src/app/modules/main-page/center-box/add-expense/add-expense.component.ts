import {Component, OnInit} from '@angular/core';
import {CashBoxService} from "../../../../core/services/cash-box-service";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  private displayState: boolean = false;

  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const
  users: string[] = [
    'Maciek', 'Wojtek'
  ]

  constructor(private cashService: CashBoxService) {
  }

  ngOnInit() {
    this.cashService.displayState.subscribe(state => this.displayState = state)
  }

  onClick() {
    this.displayState = !this.displayState
    this.cashService.onChangeDisplay(this.displayState)
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.users.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

}
