import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'swars-round-counter',
  templateUrl: './round-counter.component.html',
  styleUrls: ['./round-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class RoundCounterComponent {
  @Input()
  round: number;

  constructor() {
  }
}
