import {Component, OnDestroy, OnInit} from '@angular/core';

import {CashBoxService} from "../../../core/services/cash-box-service";
import {Subscription} from "rxjs";
import {CenterBoxService} from "../../../core/services/center-box-service";

@Component({
  selector: 'app-center-box',
  templateUrl: './center-box.component.html',
  styleUrls: ['./center-box.component.scss']
})
export class CenterBoxComponent implements OnInit, OnDestroy {
  expenseDisplay: boolean = false;
  private cashSubscription!: Subscription;
  private selectedSubscription!: Subscription;
  public displayString: string = 'Dashboard'

  constructor(private cashService: CashBoxService,
              private centerBoxService: CenterBoxService) {
  }

  onAddExpenseClick(): void {
    this.expenseDisplay = !this.expenseDisplay;
    this.cashService.onChangeDisplay(this.expenseDisplay);
  }

  ngOnInit(): void {
    this.cashSubscription = this.cashService.displayState.subscribe(state => this.expenseDisplay = state);
    this.selectedSubscription = this.centerBoxService.selected.subscribe(
      selected => this.displayString = selected)
  }

  ngOnDestroy(): void {
    this.cashSubscription.unsubscribe();
  }

}
