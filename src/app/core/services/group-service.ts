import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class GroupService {
  public userSource = new BehaviorSubject<string[]>([])

  public changeSearch(users: string[]): void {
    this.userSource.next(users);
  }

}
