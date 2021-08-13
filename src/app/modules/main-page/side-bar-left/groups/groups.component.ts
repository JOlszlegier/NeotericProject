import {Component, OnInit} from '@angular/core';
import {searchService} from "../../../../core/services/search-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groupArray: string[] = ['Kaszuby', 'Mieszkanie maj 2021'];
  searchPhrase: string = '';
  searchPhraseSubscription!: Subscription;

  constructor(private searchService: searchService) {
  }

  ngOnInit() {
    this.searchPhraseSubscription = this.searchService.currentSearch.subscribe(search => this.searchPhrase = search)
  }


}
