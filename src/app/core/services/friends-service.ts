import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: `root`})

export class FriendsService {
  public friendsList = new BehaviorSubject<string[]>([]);

  public changeFriendsList(friendsList: string[]): void {
    this.friendsList.next(friendsList);
  }
}
