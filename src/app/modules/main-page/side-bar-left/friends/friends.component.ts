import {Component, OnInit} from '@angular/core';
import {searchService} from "../../../../core/services/search-service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  friendsList: string[] = ['Kacper', 'Ola']
  searchText: string = '';
  newFriend: string = '';

  constructor(private searchService: searchService) {
  }

  addFriend(friend: string): void {
    this.friendsList.push(friend);
    this.newFriend = '';
    //  invite sent by email/ to database and then display if user accept
  }

  ngOnInit() {
    this.searchService.currentSearch.subscribe(search => this.searchText = search)
  }

}
