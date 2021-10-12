import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class GroupService {
  public userSource = new BehaviorSubject<string[]>([])
  public expensesArrayPlusSource = new BehaviorSubject<[{ description: string, amount: number }]>([{
    description: '',
    amount: 0
  }]);
  public expensesArrayMinusSource = new BehaviorSubject<[{ description: string, amount: number }]>([{
    description: '',
    amount: 0
  }]);

  public changeSearch(users: string[]): void {
    this.userSource.next(users);
  }

}
