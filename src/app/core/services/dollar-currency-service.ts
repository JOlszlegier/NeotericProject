import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class dollarCurrencyService {


  private dollarSource = new BehaviorSubject<number>(0)
  dollarState = this.dollarSource.asObservable();

  public dollarOnChange(state: number) {
    this.dollarSource.next(state);
  }
}
