import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Expenses} from "../interfaces/interfaces";

@Injectable({providedIn: 'root'})

export class GroupService {
  public userSource = new BehaviorSubject<string[]>([])
  public expensesArrayPlusSource = new BehaviorSubject<Expenses[]>([{
    description: '',
    amount: 0
  }]);
  public expensesArrayMinusSource = new BehaviorSubject<Expenses[]>([{
    description: '',
    amount: 0
  }]);

  public changeSearch(users: string[]): void {
    this.userSource.next(users);
  }

}
