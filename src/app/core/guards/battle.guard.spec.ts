import { BattleGuard } from './battle.guard';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { GameService } from '../services/game/game.service';
import { Router } from '@angular/router';

describe('BattleGuard', () => {
  let spectator: SpectatorService<BattleGuard>;
  const createService = createServiceFactory({
    service: BattleGuard,
    mocks: [GameService, Router]
  });

  beforeEach(() => spectator = createService());

  it('should let user enter the battle zone when gamemode is set', () => {
    const gameService = spectator.get(GameService);
    spyOnProperty(gameService, 'gameMode', 'get').and.returnValue(true);

    expect(spectator.service.canActivate(null, null)).toBeTruthy();
  });

  it('should not let user enter the battle zone when gamemode is not set', () => {
    const gameService = spectator.get(GameService);
    spyOnProperty(gameService, 'gameMode', 'get').and.returnValue(false);

    expect(spectator.service.canActivate(null, null)).toBeFalsy();
  });

  it('should let user load BattleModule when gamemode is set', () => {
    const gameService = spectator.get(GameService);
    const router = spectator.get(Router);
    spyOnProperty(gameService, 'gameMode', 'get').and.returnValue(true);

    expect(spectator.service.canLoad(null, null)).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });

  it('should not let user load BattleModule when gamemode is not set', () => {
    const gameService = spectator.get(GameService);
    const router = spectator.get(Router);
    spyOnProperty(gameService, 'gameMode', 'get').and.returnValue(false);

    expect(spectator.service.canLoad(null, null)).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
