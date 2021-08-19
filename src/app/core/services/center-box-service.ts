import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class CenterBoxService {
  private selectedSource = new BehaviorSubject<string>('Dashboard')
  selected = this.selectedSource.asObservable();

  onChangeSelected(selected: string) {
    this.selectedSource.next(selected);
  }


}
