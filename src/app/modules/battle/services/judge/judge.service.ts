import { Injectable } from '@angular/core';
import { Entity } from 'src/app/core/model/entity.model';

@Injectable()
export abstract class JudgeService {
  abstract judgeBattle(entityA: Entity, entityB: Entity): number;
}
