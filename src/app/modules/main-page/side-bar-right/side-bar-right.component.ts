import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../core/services/group-service";

@Component({
  selector: 'app-side-bar-right',
  templateUrl: './side-bar-right.component.html',
  styleUrls: ['./side-bar-right.component.scss']
})
export class SideBarRightComponent implements OnInit {
  selectedUsers: string[] = []

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    this.groupService.currentUsers.subscribe(users => this.selectedUsers = users)
  }

  testclick() {
    console.log(this.selectedUsers);
  }
}
