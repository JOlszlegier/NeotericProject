import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from "rxjs";
import {CenterBoxService} from "../../../../core/services/center-box-service";

@Component({
  selector: 'app-view-choice',
  templateUrl: './view-choice.component.html',
  styleUrls: ['./view-choice.component.scss']
})
export class ViewChoiceComponent implements OnInit, OnDestroy {
  constructor(private centerBoxService: CenterBoxService) {
  }

  public selectedCenterBoxView: string = '';
  public selectedSubscription!: Subscription;
  public selected$ = this.centerBoxService.selectedSource.asObservable();

  public ngOnInit(): void {
    this.selected$.subscribe(selected => this.selectedCenterBoxView = selected)

  }

  public ngOnDestroy(): void {
    this.selectedSubscription.unsubscribe();
  }

  onClick(selected: string): void {
    this.centerBoxService.onChangeSelected(selected);
  }
}
