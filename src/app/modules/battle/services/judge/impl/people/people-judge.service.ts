import { JudgeService } from '../../judge.service';
import { Human } from 'src/app/core/model/human.model';
import { MODIFICATORS_CONFIG } from '../../../../../../core/config/points.config';
import { GameMode } from '../../../../../../core/model/gamemode.model';

const MODIFICATORS = MODIFICATORS_CONFIG[GameMode.HUMAN];

export class PeopleJudgeService extends JudgeService {
  private static calculatePoints(entity: Human): number {
    return Object.keys(MODIFICATORS)
      .map(key => entity[key] * MODIFICATORS[key])
      .reduce((arr, val) => arr + val, 0);
  }

  judgeBattle(entityA: Human, entityB: Human): number {
    const pointsA = PeopleJudgeService.calculatePoints(entityA);
    const pointsB = PeopleJudgeService.calculatePoints(entityB);

    console.log(pointsA, pointsB);
    if (pointsA > pointsB) {
      return 0;
    } else if (pointsA < pointsB) {
      return 1;
    }

    return -1;
  }
}
