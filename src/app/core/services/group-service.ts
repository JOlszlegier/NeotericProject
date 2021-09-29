import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class GroupService {
  private userSource = new BehaviorSubject<string[]>([])
  currentUsers = this.userSource.asObservable();

  public changeSearch(users: string[]): void {
    this.userSource.next(users);
  }

}
