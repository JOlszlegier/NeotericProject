import {Injectable} from "@angular/core";
import {Group, User} from "../interfaces/interfaces";

@Injectable({providedIn: 'root'})

export class GroupService {
  AllGroup: Group[] = []

  addNewGroup(groupName: string, groupUsers: User[]) {
    this.AllGroup.push({groupName: groupName, users: groupUsers})
  }
}
