import { Injectable } from '@angular/core';
import { GameMode } from '../../model/gamemode.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _gameMode: GameMode;

  private _roundBehaviorSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public round$: Observable<number> = this._roundBehaviorSubject.asObservable();

  private _scoresBehaviorSubject: BehaviorSubject<number[]> = new BehaviorSubject([0, 0]);
  public scores$: Observable<number[]> = this._scoresBehaviorSubject.asObservable();

  constructor() {
  }

  runGame(gameMode: GameMode): void {
    this._gameMode = gameMode;
  }

  get gameMode() {
    return this._gameMode;
  }

  incrementPlayerScore(player: number): void {
    if (player < 0 || player > 1) {
      throw new Error("PLAYER-NOT-EXISTS");
    }

    const currentScore = [...this._scoresBehaviorSubject.getValue()];
    currentScore[player] = currentScore[player] + 1;
    return this._scoresBehaviorSubject.next(currentScore);
  }

  incrementRound(): void {
    this._roundBehaviorSubject.next(this._roundBehaviorSubject.getValue() + 1);
  }
}
