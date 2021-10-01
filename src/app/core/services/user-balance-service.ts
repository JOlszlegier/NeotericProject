import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})

export class UserBalanceService {
  incomeSource = new BehaviorSubject<number>(0);
  income = this.incomeSource.asObservable();

  outcomeSource = new BehaviorSubject<number>(0);
  outcome = this.outcomeSource.asObservable();

  differenceSource = new BehaviorSubject<number>(0);
  difference = this.differenceSource.asObservable();

  onValuesChange(income: number, outcome: number): void {
    this.incomeSource.next(income);
    this.outcomeSource.next(outcome);
    this.differenceSource.next(income - outcome);
  }

}
