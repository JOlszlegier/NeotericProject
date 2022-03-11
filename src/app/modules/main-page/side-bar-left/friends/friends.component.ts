import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

import {SearchService} from "../../../../core/services/search-service";
import {AuthApiService} from "../../../../core/services/auth-api-service";
import {FriendsService} from "../../../../core/services/friends-service";
import {MessagesService} from "../../../../core/services/messages-service";
import {SnackbarEnums} from "../../../shared/snackbar-enums";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
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
              private cookieService: CookieService, private friendsService: FriendsService,
              private snackBar: MatSnackBar, private messageService: MessagesService) {
  }

  addFriend(friend: string): void {
    this.newFriend = '';
    if (friend !== this.cookieService.get('userEmail')) {
      const addFriendSub = this.authApiService.addFriend(this.cookieService.get('userId'), friend).subscribe(data => {
        this.friendsList = data;
        this.messageService.openSuccessSnackBar(SnackbarEnums.AddFriendSuccess, 3000);
        this.friendsService.friendsList.next(this.friendsList);
      }, err => {
        this.messageService.openErrorSnackBar(err.error[Object.keys(err.error)[1]], 3000);
      })
      this.subscriptions.add(addFriendSub);
    } else {
      this.messageService.openErrorSnackBar(SnackbarEnums.AddFriendFailureAddYourself, 3000);
    }
  }

  ngOnInit(): void {
    this.searchPhrase$.subscribe(searchPhrase => this.searchPhrase = searchPhrase);
    this.friendsList$.subscribe(friendsList => this.friendsList = friendsList);
    this.getFriends();
  }

  getFriends(): void {
    let userId = this.cookieService.get('userId');
    const updateFriendsListSub = this.authApiService.getFriendsList(userId).subscribe(data => {
      this.friendsList = data;
    })
    this.friendsService.changeFriendsList(this.friendsList);
    this.subscriptions.add(updateFriendsListSub);
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
