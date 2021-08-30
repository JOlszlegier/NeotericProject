import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Injectable({providedIn: "root"})
export class CashBoxService {
  private displaySource = new BehaviorSubject<boolean>(false)
  displayState = this.displaySource.asObservable();

  public onChangeDisplay(state: boolean): void {
    this.displaySource.next(state);
  }

  public dialogClose(dialog: MatDialog): void {
    dialog.closeAll();
  }
}
