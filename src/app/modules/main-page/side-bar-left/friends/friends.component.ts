import {Component, OnDestroy, OnInit} from '@angular/core';

import {SearchService} from "../../../../core/services/search-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})

export class FriendsComponent implements OnInit, OnDestroy {

  public friendsList: string[] = ['Kacper', 'Ola']
  public searchPhrase: string = '';
  public newFriend: string = '';
  public searchPhraseSubscription!: Subscription;

  constructor(private searchService: SearchService) {
  }

  addFriend(friend: string): void {
    this.friendsList.push(friend);
    this.newFriend = '';
    //  invite will be sent by email/ and users will be displayed when they accept the invite
  }

  ngOnInit(): void {
    this.searchPhraseSubscription = this.searchService.currentSearch.subscribe(search => this.searchPhrase = search)
  }

  ngOnDestroy(): void {
    this.searchPhraseSubscription.unsubscribe()
  }

}
