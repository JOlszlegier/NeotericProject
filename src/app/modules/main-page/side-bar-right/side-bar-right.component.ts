import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {GroupService} from "../../../core/services/group-service";

@Component({
  selector: 'app-side-bar-right',
  templateUrl: './side-bar-right.component.html',
  styleUrls: ['./side-bar-right.component.scss']
})
export class SideBarRightComponent implements OnInit, OnDestroy {
  public selectedUsers: string[] = [];
  public usersSubscribe: Subscription = new Subscription();
  public selectedUsers$ = this.groupService.userSource.asObservable();

  constructor(private groupService: GroupService) {
  }

  public ngOnInit(): void {
    this.selectedUsers$.subscribe(selected => this.selectedUsers = selected);
  }

  public ngOnDestroy(): void {
    this.usersSubscribe.unsubscribe();
  }

}
