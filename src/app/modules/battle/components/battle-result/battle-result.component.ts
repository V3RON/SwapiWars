import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'swars-battle-result',
  templateUrl: './battle-result.component.html',
  styleUrls: ['./battle-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BattleResultComponent {
  _player: number;

  @Input()
  set player(value: number) {
    if (value < -1 || value > 1) {
      throw new Error('UNKNOWN-PLAYER');
    }

    this._player = value;
  }

  constructor() {
  }
}
