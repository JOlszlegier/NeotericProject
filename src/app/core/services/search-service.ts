import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";


@Injectable({providedIn: "root"})

export class searchService {
  private searchSource = new BehaviorSubject<string>('');
  currentSearch = this.searchSource.asObservable();

  changeSearch(message: string): void {
    this.searchSource.next(message);
  }


}
