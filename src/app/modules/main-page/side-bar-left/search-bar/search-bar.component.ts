import {Component, OnInit} from '@angular/core';
import {searchService} from "../../../../core/services/search-service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchText: string = '';

  constructor(private searchService: searchService) {
  }

  testClick(): void {
    console.log(`working`);
  }

  ngOnInit(): void {
    this.searchService.currentSearch.subscribe(search => this.searchText = search);
  }

  valueChange(text: string) {
    this.searchService.changeSearch(text);
  }

}
