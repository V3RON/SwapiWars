import { Injectable } from '@angular/core';
import { JudgeService } from '../judge/judge.service';
import { Entity } from 'src/app/core/model/entity.model';
import { SwapiService } from 'src/app/core/services/swapi/swapi.service';
import { GameService } from 'src/app/core/services/game/game.service';
import { concat, Observable, throwError } from 'rxjs';
import { catchError, toArray } from 'rxjs/operators';
import { GameMode } from 'src/app/core/model/gamemode.model';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  constructor(
    private judge: JudgeService,
    private swapi: SwapiService,
    private game: GameService
  ) {
  }

  // TODO: Add proper error handling
  getBattlePair(): Observable<Entity[]> {
    return concat(this.getEntityForMode(), this.getEntityForMode()).pipe(toArray(), catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return this.getBattlePair();
      }

      return throwError(error);
    }));
  }

  getEntityForMode(): Observable<Entity> {
    if (this.game.gameMode === GameMode.HUMAN) {
      return this.swapi.getRandomHuman();
    } else if (this.game.gameMode === GameMode.STARSHIP) {
      return this.swapi.getRandomStarship();
    }
  }

  getWinner(pair: Entity[]): number {
    if (pair.length != 2) {
      throw new Error('WINNER-NOT-PAIR');
    }

    return this.judge.judgeBattle(pair[0], pair[1]);
  }

  endRound(winner: number): void {
    this.game.incrementRound();

    if (winner !== -1) {
      this.game.incrementPlayerScore(winner);
    }
  }
}
