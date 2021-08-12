import {Component} from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  friendsList: string[] = ['Kacper', 'Ola', 'Kuba']
  searchText: string = '';

  addFriend(): void {
    this.friendsList.push('This works!');
    //  invite sent by email/ to database and then display if user accept
  }

}
