import {Component, OnDestroy, OnInit} from '@angular/core';

import {GroupService} from "../../../core/services/group-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-side-bar-right',
  templateUrl: './side-bar-right.component.html',
  styleUrls: ['./side-bar-right.component.scss']
})
export class SideBarRightComponent implements OnInit, OnDestroy {
  public selectedUsers: string[] = [];
  public usersSubscribe!: Subscription;

  constructor(private groupService: GroupService) {
  }

  public ngOnInit(): void {
    this.usersSubscribe = this.groupService.currentUsers.subscribe(users => this.selectedUsers = users)
  }

  public ngOnDestroy(): void {
    this.usersSubscribe.unsubscribe();
  }

}
