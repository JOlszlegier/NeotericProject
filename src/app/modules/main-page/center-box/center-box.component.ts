import {Component, OnInit} from '@angular/core';
import {CashBoxService} from "../../../core/services/cash-box-service";

@Component({
  selector: 'app-center-box',
  templateUrl: './center-box.component.html',
  styleUrls: ['./center-box.component.scss']
})
export class CenterBoxComponent implements OnInit {
  expenseDisplay: boolean = false;

  constructor(private cashService: CashBoxService) {
  }

  onAddExpenseClick() {
    this.expenseDisplay = !this.expenseDisplay;
    this.cashService.onChangeDisplay(this.expenseDisplay)
  }

  ngOnInit() {
    this.cashService.displayState.subscribe(state => this.expenseDisplay = state)
  }

}
