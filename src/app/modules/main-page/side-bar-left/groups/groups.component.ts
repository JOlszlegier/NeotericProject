import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

import {SearchService} from "../../../../core/services/search-service";
import {GroupService} from "../../../../core/services/group-service";
import {CenterBoxService} from "../../../../core/services/center-box-service";
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {Expenses} from "../../../../core/interfaces/interfaces";
import {UserBalanceService} from "../../../../core/services/user-balance-service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit, OnDestroy {
  public groupNames: string[] = [];

  public selectedGroupUsers: string[] = [];
  public searchPhrase: string = '';
  public selectedGroupName: string = ''
  public subscriptions = new Subscription()
  public searchPhrase$ = this.searchService.searchSource.asObservable();
  public selectedGroup$ = this.groupService.userSource.asObservable();
  public selected$ = this.centerBoxService.selectedSource.asObservable();
  public expensesArrayPlus$ = this.groupService.expensesArrayPlusSource.asObservable();
  public expensesArrayMinus$ = this.groupService.expensesArrayMinusSource.asObservable();
  public expensesArrayPlus: Expenses[] = [{description: '1', amount: 0}]
  public expensesArrayMinus: Expenses[] = [{description: '1', amount: 0}]

  constructor(private searchService: SearchService, private router: Router,
              private groupService: GroupService, private centerBoxService: CenterBoxService, private authApiService: AuthApiService,
              private cookieService: CookieService, private userBalanceService: UserBalanceService) {
  }

  public ngOnInit(): void {
    this.expensesArrayPlus$.subscribe(expensesArray => this.expensesArrayPlus = expensesArray);
    this.expensesArrayMinus$.subscribe(expensesArray => this.expensesArrayMinus = expensesArray);

    this.searchPhrase$.subscribe(searchPhrase => this.searchPhrase = searchPhrase)
    const groupSearchSub = this.authApiService.searchGroup(this.cookieService.get('userId')).subscribe(data => {
      for (const groupName of data) {
        this.groupNames.push(groupName);
      }
    });
    this.selectedGroup$.subscribe(selectedGroup => this.selectedGroupUsers = selectedGroup);
    this.selected$.subscribe(selected => this.selectedGroupName = selected);
    this.subscriptions.add(groupSearchSub);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public newGroupLink(): void {
    this.router.navigate(['/new-group']);
  }

  public onGroupClick(groupName: string): void {
    this.centerBoxService.onChangeSelected(groupName);

    const balanceUpdateSub = this.authApiService.balanceCheck(Number(this.cookieService.get('userId')), groupName).subscribe(data => {
      this.userBalanceService.onValuesChange(data.income, data.outcome);
    })

    const usersSearchSub = this.authApiService.getUsersInGroup(groupName, Number(this.cookieService.get('userId'))).subscribe(users => {
      this.selectedGroupUsers = users;
      this.groupService.changeSearch(this.selectedGroupUsers);
    })
    this.subscriptions.add(usersSearchSub);
    this.expensesArrayMinus.splice(0, this.expensesArrayMinus.length);
    this.expensesArrayPlus.splice(0, this.expensesArrayPlus.length);

    const expensesSubPlus = this.authApiService.expensesInfoPlus(this.cookieService.get('userId'), this.selectedGroupName).subscribe(data => {
      for (let expense in data.transactionInfo) {
        this.expensesArrayPlus.push(data.transactionInfo[expense]);
      }
      this.groupService.expensesArrayPlusSource.next(this.expensesArrayPlus);
    })

    const expensesSubMinus = this.authApiService.expensesInfoMinus(this.cookieService.get('userId'), this.selectedGroupName).subscribe(data => {

      for (let expense in data.transactionInfo) {
        this.expensesArrayMinus.push(data.transactionInfo[expense]);
      }
      this.groupService.expensesArrayMinusSource.next(this.expensesArrayMinus);
    })

    this.subscriptions.add(expensesSubMinus);
    this.subscriptions.add(expensesSubPlus);

  }

}
