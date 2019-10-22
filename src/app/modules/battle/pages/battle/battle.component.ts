import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { BattleService } from '../../services/battle/battle.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Entity } from 'src/app/core/model/entity.model';
import { GameService } from 'src/app/core/services/game/game.service';
import { debounceTime, map, tap } from "rxjs/operators";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [BattleService]
})
export class BattleComponent implements OnInit, OnDestroy {
  entities$: Observable<Entity[]>;
  round$: Observable<number>;
  scores$: Observable<number[]>;
  ended: boolean;
  winner: number;

  private rerollButtonSubject: Subject<void> = new Subject<void>();
  private rerollButtonSubscription: Subscription;
  private endedSubscription: Subscription;

  constructor(
    private battle: BattleService,
    private game: GameService,
    private changeDet: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.round$ = this.game.round$;
    this.scores$ = this.game.scores$;

    this.boostrapBattle();
  }

  ngOnDestroy() {
    this.teardownBattle();
  }

  boostrapBattle() {
    this.entities$ = this.battle.getBattlePair();

    this.endedSubscription = this.entities$.pipe(
      map(pair => this.battle.getWinner(pair)),
      tap(winner => this.battle.endRound(winner))
    ).subscribe(winner => {
      this.ended = true;
      this.winner = winner;
    });

    this.rerollButtonSubscription = this.rerollButtonSubject.pipe(
      debounceTime(200)
    ).subscribe(() => {
      this.teardownBattle();
      this.boostrapBattle();
    });
  }

  teardownBattle() {
    this.ended = false;
    this.winner = undefined;
    !!this.endedSubscription && this.endedSubscription.unsubscribe();
    !!this.rerollButtonSubscription && this.rerollButtonSubscription.unsubscribe();
    this.changeDet.markForCheck();
  }

  rerollEntities() {
    this.rerollButtonSubject.next();
  }
}
