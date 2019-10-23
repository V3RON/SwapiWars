import { JudgeService } from '../../judge.service';
import { Human } from 'src/app/core/model/human.model';

const MODIFICATORS = {
  height: 2,
  mass: 1
};


export class PeopleJudgeService extends JudgeService {
  private static calculatePoints(entity: Human): number {
    return Object.keys(MODIFICATORS)
      .map(key => (isNaN(entity[key]) ? 0 : entity[key]) * MODIFICATORS[key])
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
