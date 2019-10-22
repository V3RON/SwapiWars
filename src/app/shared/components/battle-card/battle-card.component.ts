import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Entity } from '../../../core/model/entity.model';

@Component({
  selector: 'swars-battle-card',
  templateUrl: './battle-card.component.html',
  styleUrls: ['./battle-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BattleCardComponent {
  _entity: Entity = {
    name: '?????',
    stats: []
  };

  @Input()
  set entity(entity: Entity) {
    if (!!entity) {
      this._entity = entity;
    }
  }

  constructor() {
  }
}
