import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'swars-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GameScoreComponent {
  @Input()
  scores: number[];

  constructor() {
  }
}
