import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})
export class CashBoxService {
  public displaySource = new BehaviorSubject<boolean>(false)


  public onChangeDisplay(state: boolean): void {
    this.displaySource.next(state);
  }


}
