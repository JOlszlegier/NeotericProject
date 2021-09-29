import {Component, OnDestroy, OnInit} from '@angular/core';

import {SearchService} from "../../../../core/services/search-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit, OnDestroy {
  public searchText: string = '';
  public searchTextSubscription!: Subscription;

  constructor(private searchService: SearchService) {
  }

  public ngOnInit(): void {
    this.searchTextSubscription = this.searchService.currentSearch.subscribe(
      search => this.searchText = search);
  }

  public ngOnDestroy(): void {
    this.searchTextSubscription.unsubscribe();
  }

  public valueChange(text: string): void {
    this.searchService.changeSearch(text);
  }

}
