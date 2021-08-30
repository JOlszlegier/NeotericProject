import {Component} from '@angular/core';

@Component({
  selector: 'app-cash-status',
  templateUrl: './cash-status.component.html',
  styleUrls: ['./cash-status.component.scss']
})
export class CashStatusComponent {
  public moneyTest: number[] = [-10, 2, 25]
}
