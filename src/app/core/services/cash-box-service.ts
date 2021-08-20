import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Injectable({providedIn: "root"})
export class CashBoxService {
  private displaySource = new BehaviorSubject<boolean>(false)
  displayState = this.displaySource.asObservable();

  onChangeDisplay(state: boolean) {
    this.displaySource.next(state);
  }

  dialogClose(dialog: MatDialog) {
    dialog.closeAll();
  }
}
