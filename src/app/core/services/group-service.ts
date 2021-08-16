import {Injectable} from "@angular/core";
import {Group, User} from "../interfaces/interfaces";

@Injectable({providedIn: 'root'})

export class GroupService {
  AllGroup: Group[] = []

  addGroup(groupName: string, groupUsers: User[]): void {
    this.AllGroup.push({groupName: groupName, users: groupUsers});
    console.log(this.AllGroup);
  }

  getAllGroupData(): Group[] {
    return this.AllGroup;
  }


}
