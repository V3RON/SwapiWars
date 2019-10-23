import { BattleCardComponent } from './battle-card.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { Human } from '../../../core/model/human.model';
import { HumanSchema, StarshipSchema } from '../../../core/services/swapi/swapi.schema';
import { Starship } from '../../../core/model/starship.model';
import { MatCardModule } from '@angular/material/card';
import { UndasherPipe } from '../../pipes/undasher/undasher.pipe';
import { TitleCasePipe } from '@angular/common';

describe('BattleCardComponent', () => {
  let spectator: SpectatorHost<BattleCardComponent>;
  const createHost = createHostFactory({
    component: BattleCardComponent,
    imports: [MatCardModule],
    declarations: [UndasherPipe]
  });

  const exampleHuman: Human = new Human({
    name: 'Lorem ipsum',
    mass: '12',
    height: '14',
    gender: 'male'
  } as unknown as HumanSchema);
  const exampleStarship: Starship = new Starship({
    name: 'Lorem ipsum starship',
    crew: '124',
    passengers: '1234',
    cost_in_credits: '12345'
  } as unknown as StarshipSchema);

  beforeEach(() => spectator = createHost('<swars-battle-card [entity]="entity"></swars-battle-card>'));

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should display \'????\' when no entity is given', () => {
    expect(spectator.component._entity.name).toEqual('????');
  });

  it('should display card title', () => {
    spectator.setHostInput({
      entity: exampleHuman
    });

    expect(spectator.component._entity).toEqual(exampleHuman);
    expect(spectator.query('mat-card-title')).toHaveText(exampleHuman.name);
  });

  describe('should display stats of', () => {
    const verifyStats = (entity) => {
      const undasherPipe = new UndasherPipe();
      const titleCasePipe = new TitleCasePipe();

      const renderedStats = spectator.queryAll('.swars-battle-card__stat');
      const stats = entity.stats;

      expect(renderedStats).toHaveLength(entity.stats.length);
      renderedStats.forEach((renderedStat, index) => {
        const pipedName = titleCasePipe.transform(undasherPipe.transform(stats[index].name));
        expect(renderedStat.textContent.trim()).toEqual(stats[index].value + ' ' + pipedName);
      });
    };

    it('human', async () => {
      spectator.setHostInput({
        entity: exampleHuman
      });

      verifyStats(exampleHuman);
    });

    it('starship', () => {
      spectator.setHostInput({
        entity: exampleStarship
      });

      verifyStats(exampleStarship);
    });
  });
});
