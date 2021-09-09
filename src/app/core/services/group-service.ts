import {Injectable} from "@angular/core";
import {Group, User} from "../interfaces/interfaces";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class GroupService {
  allGroup: Group[] = []

  private userSource = new BehaviorSubject<string[]>([])
  currentUsers = this.userSource.asObservable();

  public addNewGroup(groupName: string, groupUsers: User[]): void {
    this.allGroup.push({groupName, users: groupUsers})
  }

  public changeSearch(users: string[]): void {
    this.userSource.next(users);
  }

}
