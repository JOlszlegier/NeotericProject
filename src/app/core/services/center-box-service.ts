import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class CenterBoxService {
  public selectedSource = new BehaviorSubject<string>('Dashboard')

  public onChangeSelected(selected: string): void {
    this.selectedSource.next(selected);
  }


}
