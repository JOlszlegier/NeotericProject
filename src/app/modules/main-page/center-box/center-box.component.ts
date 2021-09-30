import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {CashBoxService} from "../../../core/services/cash-box-service";
import {Subscription} from "rxjs";
import {CenterBoxService} from "../../../core/services/center-box-service";
import {AddExpenseComponent} from "./add-expense/add-expense.component";
import {SettleUpComponent} from "./settle-up/settle-up.component";

@Component({
  selector: 'app-center-box',
  templateUrl: './center-box.component.html',
  styleUrls: ['./center-box.component.scss']
})
export class CenterBoxComponent implements OnInit, OnDestroy {

  expenseDisplay: boolean = false;
  private subscriptions!: Subscription;
  public displayString: string = 'Dashboard'

  constructor(private cashService: CashBoxService,
              private centerBoxService: CenterBoxService,
              private matDialog: MatDialog) {
  }

  onAddExpenseClick(): void {
    this.matDialog.open(AddExpenseComponent, {panelClass: 'custom-dialog-class'})
    this.cashService.onChangeDisplay(true);
  }

  onSettleUpClick(): void {
    this.matDialog.open(SettleUpComponent, {panelClass: 'custom-dialog-class'})
    this.cashService.onChangeDisplay(true);
  }


  ngOnInit(): void {
    this.subscriptions = this.cashService.displayState.subscribe(state => this.expenseDisplay = state);
    this.subscriptions = this.centerBoxService.selected.subscribe(
      selected => this.displayString = selected)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
