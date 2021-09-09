import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


@Injectable({providedIn: "root"})

export class SearchService {
  private searchSource = new BehaviorSubject<string>('');
  public currentSearch = this.searchSource.asObservable();

  public changeSearch(message: string): void {
    this.searchSource.next(message);
  }


}
