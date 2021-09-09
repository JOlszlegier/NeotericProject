import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: `root`})

export class CurrencyInfoService {
  private euroSource = new BehaviorSubject<number>(0)
  euroState = this.euroSource.asObservable();
  private dollarSource = new BehaviorSubject<number>(0)
  dollarState = this.dollarSource.asObservable();

  public euroOnChange(state: number) {
    this.euroSource.next(state);
  }

  public dollarOnChange(state: number) {
    this.dollarSource.next(state);
  }
}
