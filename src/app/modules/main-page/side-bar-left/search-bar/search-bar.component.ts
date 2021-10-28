import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {SearchService} from "../../../../core/services/search-service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit, OnDestroy {
  public searchText: string = '';
  public searchTextSubscription: Subscription = new Subscription();
  public searchPhrase$ = this.searchService.searchSource.asObservable();

  constructor(private searchService: SearchService) {
  }

  public ngOnInit(): void {
    this.searchPhrase$.subscribe(searchPhrase => this.searchText = searchPhrase)

  }

  public ngOnDestroy(): void {
    this.searchTextSubscription.unsubscribe();
  }

  public valueChange(text: string): void {
    this.searchService.changeSearch(text);
  }

}
