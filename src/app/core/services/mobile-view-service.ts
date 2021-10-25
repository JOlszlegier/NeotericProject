import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})

export class MobileViewService {
  public viewSelected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
