import {Injectable} from "@angular/core";
import {Group, User} from "../interfaces/interfaces";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class GroupService {
  AllGroup: Group[] = []

  private userSource = new BehaviorSubject<string[]>([])
  currentUsers = this.userSource.asObservable();


  addNewGroup(groupName: string, groupUsers: User[]) {
    this.AllGroup.push({groupName: groupName, users: groupUsers})
  }

  changeSearch(users: string[]): void {
    this.userSource.next(users);
  }

}
