import { GameService } from './game.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { GameMode } from '../../model/gamemode.model';
import { take, takeUntil, toArray } from 'rxjs/operators';
import { timer } from 'rxjs';

describe('GameService', () => {
  let spectator: SpectatorService<GameService>;
  const createService = createServiceFactory(GameService);
  beforeEach(() => spectator = createService());

  it('should hold gamemode when started', () => {
    spectator.service.runGame(GameMode.HUMAN);
    expect(spectator.service.gameMode).toEqual(GameMode.HUMAN);
  });

  it('increment points counter when player id is legit', (done: DoneFn) => {
    spectator.service.scores$.pipe(take(3), toArray()).subscribe(scores => {
      expect(scores[0]).toEqual([0, 0]);
      expect(scores[1]).toEqual([1, 0]);
      expect(scores[2]).toEqual([1, 1]);
      done();
    });

    spectator.service.incrementPlayerScore(0);
    spectator.service.incrementPlayerScore(1);
  });

  it('throw error when incrementing player\'s score whose id is not legit', (done: DoneFn) => {
    spectator.service.scores$.pipe(takeUntil(timer(1000)), toArray()).subscribe(scores => {
      expect(scores.length).toEqual(1);
      expect(scores[0]).toEqual([0, 0]);
      done();
    });

    spectator.service.incrementPlayerScore(-1);
    spectator.service.incrementPlayerScore(2);
  });

  it('increment round counter when function invoked', (done: DoneFn) => {
    spectator.service.round$.pipe(take(3), toArray()).subscribe(rounds => {
      expect(rounds[0]).toEqual(0);
      expect(rounds[1]).toEqual(1);
      expect(rounds[2]).toEqual(2);
      done();
    });

    spectator.service.incrementRound();
    spectator.service.incrementRound();
  });
});
