import { BattleService } from './battle.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { GameService } from '../../../../core/services/game/game.service';
import { SwapiService } from '../../../../core/services/swapi/swapi.service';
import { GameMode } from '../../../../core/model/gamemode.model';
import { of } from 'rxjs';
import { Entity } from '../../../../core/model/entity.model';
import { JudgeService } from '../judge/judge.service';

describe('BattleService', () => {
  let spectator: SpectatorService<BattleService>;
  const createService = createServiceFactory({
    service: BattleService,
    mocks: [SwapiService, GameService],
    providers: [{
      provide: JudgeService,
      useValue: {
        judgeBattle: (a, b) => 0
      }
    }]
  });

  beforeEach(() => spectator = createService());

  describe('fetching entities', () => {
    describe('human', () => {
      it('should fetch pair of cards', (done: DoneFn) => {
        spyOnProperty(spectator.get(GameService), 'gameMode', 'get').and.returnValue(GameMode.HUMAN);
        spectator.get(SwapiService).getRandomHuman.and.returnValues(of({name: '1'} as Entity), of({name: '2'} as Entity));

        spectator.service.getBattlePair().subscribe(pair => {
          expect(pair).toEqual([{name: '1'} as Entity, {name: '2'} as Entity]);
          done();
        });
      });

      it('should fetch random entity', () => {
        spyOnProperty(spectator.get(GameService), 'gameMode', 'get').and.returnValue(GameMode.HUMAN);
        spectator.service.getEntityForMode();
        expect(spectator.get(SwapiService).getRandomHuman).toHaveBeenCalled();
      });
    });

    describe('starship', () => {
      it('should fetch pair of cards', (done: DoneFn) => {
        spyOnProperty(spectator.get(GameService), 'gameMode', 'get').and.returnValue(GameMode.STARSHIP);
        spectator.get(SwapiService).getRandomStarship.and.returnValues(of({name: '1'} as Entity), of({name: '2'} as Entity));

        spectator.service.getBattlePair().subscribe(pair => {
          expect(pair).toEqual([{name: '1'} as Entity, {name: '2'} as Entity]);
          done();
        });
      });

      it('should fetch random entity', () => {
        spyOnProperty(spectator.get(GameService), 'gameMode', 'get').and.returnValue(GameMode.STARSHIP);
        spectator.service.getEntityForMode();
        expect(spectator.get(SwapiService).getRandomStarship).toHaveBeenCalled();
      });
    });
  });

  it('should use the judge to get winner', () => {
    const judge = spectator.get(JudgeService);
    spyOn(judge, 'judgeBattle').and.returnValue(0);
    spectator.service.getWinner([{} as Entity, {} as Entity]);
    expect(judge.judgeBattle).toHaveBeenCalled();
  });

  it('should increment round and player score counters', () => {
    const game = spectator.get(GameService);
    spectator.service.endRound(0);
    expect(game.incrementRound).toHaveBeenCalled();
    expect(game.incrementPlayerScore).toHaveBeenCalled();
  });

  it('should only increment round counter when a tie happen', () => {
    const game = spectator.get(GameService);
    spectator.service.endRound(-1);
    expect(game.incrementRound).toHaveBeenCalled();
    expect(game.incrementPlayerScore).not.toHaveBeenCalled();
  });
});
