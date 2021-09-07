import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class euroCurrencyService {


  private euroSource = new BehaviorSubject<number>(0)
  euroState = this.euroSource.asObservable();

  public euroOnChange(state: number) {
    this.euroSource.next(state);
  }
}
