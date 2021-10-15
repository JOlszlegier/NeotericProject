import {Component, OnDestroy, OnInit} from '@angular/core';

import {SearchService} from "../../../../core/services/search-service";
import {Subscription} from "rxjs";
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {CookieService} from "ngx-cookie-service";
import {FriendsService} from "../../../../core/services/friends-service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})

export class FriendsComponent implements OnInit, OnDestroy {

  public friendsList: string[] = [''];
  public searchPhrase: string = '';
  public newFriend: string = '';
  public subscriptions: Subscription = new Subscription();
  public errorMessage: string = '';
  public searchPhrase$ = this.searchService.searchSource.asObservable();
  public friendsList$ = this.friendsService.friendsList.asObservable();

  constructor(private searchService: SearchService, private authApiService: AuthApiService,
              private cookieService: CookieService, private friendsService: FriendsService) {
  }

  addFriend(friend: string): void {
    this.newFriend = '';
    const addFriendSub = this.authApiService.addFriend(this.cookieService.get('userId'), friend).subscribe(data => {
      this.friendsList = data.friends;
      this.errorMessage = data.errorMessage;
    })
    this.subscriptions.add(addFriendSub);
  }

  ngOnInit(): void {
    this.searchPhrase$.subscribe(searchPhrase => this.searchPhrase = searchPhrase);
    // this.friendsList$.subscribe(friendsList => {
    //   this.friendsList = friendsList;
    // });
    this.getFriends();
  }

  getFriends() {
    const updateFriendsListSub = this.authApiService.getFriendsList(this.cookieService.get('userId')).subscribe(data => {
      this.friendsList = data.friends;
      this.friendsService.friendsList.next(this.friendsList);
    })
    this.subscriptions.add(updateFriendsListSub);
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
