import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CenterBoxService} from "../../../../core/services/center-box-service";

@Component({
  selector: 'app-view-choice',
  templateUrl: './view-choice.component.html',
  styleUrls: ['./view-choice.component.scss']
})
export class ViewChoiceComponent implements OnInit {
  constructor(private centerBoxService: CenterBoxService) {
  }

  selectedCenterBoxView: string = '';
  selectedSubscription!: Subscription;

  ngOnInit() {
    this.selectedSubscription = this.centerBoxService.selected.subscribe(
      selected => this.selectedCenterBoxView = selected)
  }

  onClick(selected: string) {
    this.centerBoxService.onChangeSelected(selected);
  }
}
