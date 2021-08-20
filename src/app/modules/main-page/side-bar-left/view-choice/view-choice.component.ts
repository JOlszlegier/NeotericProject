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

  ngOnInit(): void {
    this.selectedSubscription = this.centerBoxService.selected.subscribe(
      selected => this.selectedCenterBoxView = selected)
  }

  ngOnDestroy(): void {
    this.selectedSubscription.unsubscribe();
  }

  onClick(selected: string): void {
    this.centerBoxService.onChangeSelected(selected);
  }
}
