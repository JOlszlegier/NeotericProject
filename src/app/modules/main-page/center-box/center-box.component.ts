import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {CashBoxService} from "../../../core/services/cash-box-service";
import {Subscription} from "rxjs";
import {CenterBoxService} from "../../../core/services/center-box-service";
import {AddExpenseComponent} from "./add-expense/add-expense.component";

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
              private centerBoxService: CenterBoxService,
              private matDialog: MatDialog) {
  }

  onAddExpenseClick(): void {
    this.matDialog.open(AddExpenseComponent);
    this.cashService.onChangeDisplay(true);
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
