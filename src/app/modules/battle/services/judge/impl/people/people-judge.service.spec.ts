import { PeopleJudgeService } from './people-judge.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Human } from '../../../../../../core/model/human.model';
import { HumanSchema } from '../../../../../../core/services/swapi/swapi.schema';

describe('PeopleJudgeService', () => {
  let spectator: SpectatorService<PeopleJudgeService>;
  const createService = createServiceFactory(PeopleJudgeService);

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

  const entityC = new Human({
    name: 'EntityC',
    mass: '100',
    height: '200',
    gender: 'n/a'
  } as unknown as HumanSchema);

  beforeEach(() => spectator = createService());

  it('should select winner basing on attributes', () => {
    const BC = spectator.service.judgeBattle(entityB, entityC);
    const AC = spectator.service.judgeBattle(entityA, entityC);

    expect(BC).toBe(1);
    expect(AC).toBe(1);
  });

  it('should return -1 if tie', () => {
    const AB = spectator.service.judgeBattle(entityA, entityB);
    const AA = spectator.service.judgeBattle(entityA, entityA);

    expect(AB).toBe(-1);
    expect(AA).toBe(-1);
  });
});
