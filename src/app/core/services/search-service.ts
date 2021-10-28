import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


@Injectable({providedIn: "root"})

export class SearchService {
  public searchSource = new BehaviorSubject<string>('');

  public changeSearch(message: string): void {
    this.searchSource.next(message);
  }

}
