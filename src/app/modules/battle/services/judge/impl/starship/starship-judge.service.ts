import { JudgeService } from '../../judge.service';
import { Starship } from '../../../../../../core/model/starship.model';
import { MODIFICATORS_CONFIG } from '../../../../../../core/config/points.config';
import { GameMode } from '../../../../../../core/model/gamemode.model';

const MODIFICATORS = MODIFICATORS_CONFIG[GameMode.STARSHIP];

export class StarshipJudgeService extends JudgeService {
  private static calculatePoints(entity: Starship): number {
    return Object.keys(MODIFICATORS)
      .map(key => entity[key] * MODIFICATORS[key])
      .reduce((arr, val) => arr + val, 0);
  }

  judgeBattle(entityA: Starship, entityB: Starship): number {
    const pointsA = StarshipJudgeService.calculatePoints(entityA);
    const pointsB = StarshipJudgeService.calculatePoints(entityB);

    if (pointsA > pointsB) {
      return 0;
    } else if (pointsA < pointsB) {
      return 1;
    }

    return -1;
  }
}
