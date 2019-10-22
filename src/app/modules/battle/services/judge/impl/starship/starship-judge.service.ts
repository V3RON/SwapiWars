import { JudgeService } from '../../judge.service';
import { Starship } from "../../../../../../core/model/starship.model";

const MODIFICATORS = {
  crew: 2,
  passengers: 1,
  costInCredits: 4
};

export class StarshipJudgeService extends JudgeService {
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

  private static calculatePoints(entity: Starship): number {
    return Object.keys(MODIFICATORS)
      .map(key => (isNaN(entity[key]) ? 0 : entity[key]) * MODIFICATORS[key])
      .reduce((arr, val) => arr + val, 0);
  }
}
