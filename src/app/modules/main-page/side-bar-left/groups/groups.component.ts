import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {SearchService} from "../../../../core/services/search-service";
import {Subscription} from "rxjs";
import {GroupService} from "../../../../core/services/group-service";
import {CenterBoxService} from "../../../../core/services/center-box-service";
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {CookieService} from "ngx-cookie-service";

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
  public subscriptions!: Subscription;

  constructor(private searchService: SearchService, private router: Router,
              private groupService: GroupService, private centerBoxService: CenterBoxService, private authApiService: AuthApiService,
              private cookieService: CookieService) {
  }

  public ngOnInit(): void {
    const searchPhraseSubscription = this.searchService.currentSearch.subscribe(search => this.searchPhrase = search)
    const groupSearchSub = this.authApiService.searchGroup(this.cookieService.get('userId')).subscribe(data => {
      for (const groupName of data) {
        this.groupNames.push(groupName);
      }
    });
    this.groupService.currentUsers.subscribe(users => this.selectedGroupUsers = users)
    const selectedSubscription = this.centerBoxService.selected.subscribe(selected => this.selectedGroupName = selected)
    this.subscriptions.add(groupSearchSub);
    this.subscriptions.add(searchPhraseSubscription);
    this.subscriptions.add(selectedSubscription);
  }

  public ngOnDestroy(): void {
    // this.subscriptions.unsubscribe();
  }

  public newGroupLink(): void {
    this.router.navigate(['/new-group']);
  }

  public onGroupClick(groupName: string): void {
    const usersSearchSub = this.authApiService.getUsersInGroup(groupName).subscribe(users => {
      this.selectedGroupUsers = users;
      this.groupService.changeSearch(this.selectedGroupUsers);
      this.centerBoxService.onChangeSelected(groupName);
    })
    this.subscriptions.add(usersSearchSub);

  }

}
