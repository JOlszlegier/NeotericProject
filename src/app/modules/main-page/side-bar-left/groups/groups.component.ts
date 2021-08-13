import {Component, OnDestroy, OnInit} from '@angular/core';
import {searchService} from "../../../../core/services/search-service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {
  groupArray: string[] = ['Kaszuby', 'Mieszkanie maj 2021'];
  searchPhrase: string = '';
  searchPhraseSubscription!: Subscription;

  constructor(private searchService: searchService, private router: Router) {
  }

  ngOnInit() {
    this.searchPhraseSubscription = this.searchService.currentSearch.subscribe(search => this.searchPhrase = search)
  }

  ngOnDestroy() {
    this.searchPhraseSubscription.unsubscribe();
  }

  newGroupLink() {
    this.router.navigate(['/new-group'])
  }
}
