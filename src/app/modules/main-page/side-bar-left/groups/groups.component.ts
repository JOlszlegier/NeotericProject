import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {SearchService} from "../../../../core/services/search-service";
import {Subscription} from "rxjs";
import {GroupService} from "../../../../core/services/group-service";
import {CenterBoxService} from "../../../../core/services/center-box-service";
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {NewGroup} from "../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit, OnDestroy {
  public groupArrayTest: NewGroup[] = [{
    groupName: "Default",
    users: [{email: 'test@wp.p', name: 'Kuba'}, {email: 'test@wp.p', name: 'Maciek'}]
  },
    {groupName: "Default 2", users: [{email: 'test@wp.p', name: 'Kuba'}]}];

  public groupNames: string[] = [];
  public selectedGroupUsers: string[] = [];
  public searchPhrase: string = '';
  public searchPhraseSubscription!: Subscription;
  public selectedSubscription !: Subscription;
  public selectedGroupName: string = ''

  constructor(private searchService: SearchService, private router: Router,
              private groupService: GroupService, private centerBoxService: CenterBoxService, private authApiService: AuthApiService) {
  }

  ngOnInit(): void {
    this.searchPhraseSubscription = this.searchService.currentSearch.subscribe(search => this.searchPhrase = search)
    for (let i = 0; i < this.groupArrayTest.length; i++) {
      this.groupNames[i] = this.groupArrayTest[i].groupName;
    }
    this.groupService.currentUsers.subscribe(users => this.selectedGroupUsers = users)
    this.selectedSubscription = this.centerBoxService.selected.subscribe(selected => this.selectedGroupName = selected)
  }

  ngOnDestroy(): void {
    this.searchPhraseSubscription.unsubscribe();
    this.selectedSubscription.unsubscribe();
  }

  newGroupLink(): void {
    this.router.navigate(['/new-group']);
  }

  onGroupClick(groupName: string): void {
    this.selectedGroupUsers = [];
    for (let i = 0; i < this.groupArrayTest[this.groupNames.indexOf(groupName)].users.length; i++) {
      this.selectedGroupUsers[i] = this.groupArrayTest[this.groupNames.indexOf(groupName)].users[i].name
    }
    this.groupService.changeSearch(this.selectedGroupUsers);
    this.centerBoxService.onChangeSelected(groupName);
  }

}
