import {Component, OnDestroy, OnInit} from '@angular/core';
import {CashBoxService} from "../../../core/services/cash-box-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-center-box',
  templateUrl: './center-box.component.html',
  styleUrls: ['./center-box.component.scss']
})
export class CenterBoxComponent implements OnInit, OnDestroy {
  expenseDisplay: boolean = false;
  private cashSubscription!: Subscription;

  constructor(private cashService: CashBoxService) {
  }

  onAddExpenseClick() {
    this.expenseDisplay = !this.expenseDisplay;
    this.cashService.onChangeDisplay(this.expenseDisplay);
  }

  ngOnInit() {
    this.cashSubscription = this.cashService.displayState.subscribe(state => this.expenseDisplay = state);
  }

  ngOnDestroy() {
    this.cashSubscription.unsubscribe();
  }

}
