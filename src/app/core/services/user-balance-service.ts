import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})

export class UserBalanceService {
  public incomeSource = new BehaviorSubject<number>(0);

  public outcomeSource = new BehaviorSubject<number>(0);

  public differenceSource = new BehaviorSubject<number>(0);

  onValuesChange(income: number, outcome: number): void {
    this.incomeSource.next(income);
    this.outcomeSource.next(outcome);
    this.differenceSource.next(income - outcome);
  }

}
