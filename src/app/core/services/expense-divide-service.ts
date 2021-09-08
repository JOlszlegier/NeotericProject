import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})

export class ExpenseDivideService {
  public amount: number = 0.0;

  splitEvenly(users: number, expense: number) {
    this.amount = expense / users;
    return this.amount;
  }

  splitByPercent(percent: number, expense: number) {
    this.amount = (expense * percent) / 100;
    return this.amount;
  }


}
