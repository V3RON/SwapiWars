import { StarshipJudgeService } from './starship-judge.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { StarshipSchema } from '../../../../../../core/services/swapi/swapi.schema';
import { Starship } from '../../../../../../core/model/starship.model';

describe('StarshipJudgeService', () => {
  let spectator: SpectatorService<StarshipJudgeService>;
  const createService = createServiceFactory(StarshipJudgeService);

  const entityA = new Starship({
    name: 'EntityA',
    crew: '120',
    passengers: '140',
    cost_in_credits: '120'
  } as unknown as StarshipSchema);

  const entityB = new Starship({
    name: 'EntityB',
    crew: '120',
    passengers: '140',
    cost_in_credits: 'n/a'
  } as unknown as StarshipSchema);

  const entityC = new Starship({
    name: 'EntityC',
    crew: '120',
    passengers: 'n/a',
    cost_in_credits: '120'
  } as unknown as StarshipSchema);

  beforeEach(() => spectator = createService());

  it('should select winner basing on attributes', () => {
    const BC = spectator.service.judgeBattle(entityB, entityC);
    const AC = spectator.service.judgeBattle(entityA, entityC);

    expect(BC).toBe(1);
    expect(AC).toBe(0);
  });

  it('should return -1 if tie', () => {
    const AA = spectator.service.judgeBattle(entityA, entityA);

    expect(AA).toBe(-1);
  });
});
