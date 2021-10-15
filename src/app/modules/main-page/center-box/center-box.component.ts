import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {CashBoxService} from "../../../core/services/cash-box-service";
import {Subscription} from "rxjs";
import {CenterBoxService} from "../../../core/services/center-box-service";
import {AddExpenseComponent} from "./add-expense/add-expense.component";
import {SettleUpComponent} from "./settle-up/settle-up.component";
import {UserBalanceService} from "../../../core/services/user-balance-service";
import {GroupService} from "../../../core/services/group-service";
import {FriendsService} from "../../../core/services/friends-service";

@Component({
  selector: 'app-center-box',
  templateUrl: './center-box.component.html',
  styleUrls: ['./center-box.component.scss']
})
export class CenterBoxComponent implements OnInit, OnDestroy {

  expenseDisplay: boolean = false;
  private subscriptions: Subscription = new Subscription();
  public displayString: string = 'Dashboard'
  public displayString$ = this.centerBoxService.selectedSource.asObservable();
  public displayState$ = this.cashService.displaySource.asObservable();
  public outcome$ = this.userBalanceService.outcomeSource.asObservable();
  public outcome: number = 0;
  public outcomeArray$ = this.groupService.expensesArrayMinusSource.asObservable();
  public expensesArrayMinus: [{ description: string, amount: number }] = [{description: '1', amount: 0}];
  public friendsList$ = this.friendsService.friendsList.asObservable();


  constructor(private cashService: CashBoxService, private centerBoxService: CenterBoxService,
              private matDialog: MatDialog, private userBalanceService: UserBalanceService,
              private groupService: GroupService, private friendsService: FriendsService) {
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
    this.displayState$.subscribe(source => this.expenseDisplay = source);
    this.displayString$.subscribe(selected => this.displayString = selected);
    this.outcomeArray$.subscribe(array => this.expensesArrayMinus = array);
    this.outcome$.subscribe(outcome => this.outcome = outcome);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
