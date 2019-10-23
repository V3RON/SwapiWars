import { BattleComponent } from './battle.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { LoadingIndicatorComponent } from '../../../../shared/components/loading-indicator/loading-indicator.component';
import { BattleService } from '../../services/battle/battle.service';
import { BattleCardComponent } from '../../../../shared/components/battle-card/battle-card.component';
import { BattleResultComponent } from '../../components/battle-result/battle-result.component';
import { MatCardModule } from '@angular/material/card';
import { GameScoreComponent } from '../../components/game-score/game-score.component';
import { RoundCounterComponent } from '../../components/round-counter/round-counter.component';
import { SharedModule } from '../../../../shared/shared.module';
import { NEVER, of } from 'rxjs';
import { Human } from '../../../../core/model/human.model';
import { HumanSchema } from '../../../../core/services/swapi/swapi.schema';

describe('BattleComponent', () => {
  let spectator: Spectator<BattleComponent>;
  const createComponent = createComponentFactory({
    component: BattleComponent,
    mocks: [BattleService],
    imports: [MatCardModule, SharedModule],
    declarations: [BattleResultComponent, GameScoreComponent, RoundCounterComponent],
    detectChanges: false
  });
  let battle: jasmine.SpyObj<BattleService>;

  const entityA = new Human({
    name: 'EntityA',
    mass: '120',
    height: '60',
    gender: 'n/a'
  } as unknown as HumanSchema);

  const entityB = new Human({
    name: 'EntityB',
    mass: '240',
    height: 'n/a',
    gender: 'n/a'
  } as unknown as HumanSchema);

  beforeEach(() => {
    spectator = createComponent();
    battle = spectator.get(BattleService);
  });

  describe('on startup', () => {
    it('should show loading indicator by default', () => {
      battle.getBattlePair.and.returnValue(NEVER);
      spectator.fixture.detectChanges();
      expect(spectator.query(LoadingIndicatorComponent)).toBeTruthy();
    });

    it('should disable the reroll button by default', () => {
      battle.getBattlePair.and.returnValue(NEVER);
      spectator.fixture.detectChanges();
      expect(spectator.query('.swars-battle__reroll-button')).toBeDisabled();
    });
  });

  describe('when started', () => {
    it('should get the winner from service', () => {
      battle.getBattlePair.and.returnValue(of([entityA, entityB]));
      spectator.fixture.detectChanges();
      expect(battle.getWinner).toHaveBeenCalledWith([entityA, entityB]);
    });

    it('should announce the winner to service and end round', async () => {
      battle.getBattlePair.and.returnValue(of([entityA, entityB]));
      battle.getWinner.and.returnValue(0);
      spectator.fixture.detectChanges();
      expect(battle.endRound).toHaveBeenCalledWith(0);
      await spectator.fixture.whenStable();
      expect(spectator.component.winner).toBe(0);
      expect(spectator.component.ended).toBe(true);
    });
  });

  describe('after round', () => {
    it('should hide loading indicator', () => {
      battle.getBattlePair.and.returnValue(of([entityA, entityB]));
      spectator.fixture.detectChanges();
      expect(spectator.query(LoadingIndicatorComponent)).toBeFalsy();
    });

    it('should enable the reroll button', () => {
      battle.getBattlePair.and.returnValue(of([entityA, entityB]));
      spectator.fixture.detectChanges();
      expect(spectator.query('.swars-battle__reroll-button')).not.toBeDisabled();
    });

    it('should show battle cards', () => {
      battle.getBattlePair.and.returnValue(of([entityA, entityB]));
      spectator.fixture.detectChanges();
      expect(spectator.queryAll(BattleCardComponent)).toHaveLength(2);
    });

    it('should show battle result', () => {
      battle.getBattlePair.and.returnValue(of([entityA, entityB]));
      spectator.fixture.detectChanges();
      expect(spectator.query(BattleResultComponent)).toBeTruthy();
    });

    it('should reset all variables on reroll', async () => {
      battle.getBattlePair.and.returnValues(of([entityA, entityB]), NEVER);
      spectator.fixture.detectChanges();
      spectator.click(spectator.query('.swars-battle__reroll-button'));
      await spectator.fixture.whenStable();
      expect(spectator.component.winner).toBe(undefined);
      expect(spectator.component.ended).toBe(false);
    });
  });
});
