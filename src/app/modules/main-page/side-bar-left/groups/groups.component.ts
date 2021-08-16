import {Component, OnDestroy, OnInit} from '@angular/core';
import {searchService} from "../../../../core/services/search-service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Group} from "../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {
  groupArrayTest: Group[] = [{groupName: "Default", users: [{email: 'test@wp.p', name: 'Kuba'}]},
    {groupName: "Default with group interface", users: [{email: 'test@wp.p', name: 'Kuba'}]}];
  groupNames: string[] = [];

  searchPhrase: string = '';
  searchPhraseSubscription!: Subscription;

  constructor(private searchService: searchService, private router: Router) {
  }

  ngOnInit() {
    this.searchPhraseSubscription = this.searchService.currentSearch.subscribe(search => this.searchPhrase = search)
    for (let i = 0; i < this.groupArrayTest.length; i++) {
      this.groupNames[i] = this.groupArrayTest[i].groupName;
    }
  }

  ngOnDestroy() {
    this.searchPhraseSubscription.unsubscribe();
  }

  newGroupLink() {
    this.router.navigate(['/new-group'])
  }


}
