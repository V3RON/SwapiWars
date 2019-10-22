import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattleRoutingModule } from './battle-routing.module';
import { BattleComponent } from './pages/battle/battle.component';
import { JudgeService } from './services/judge/judge.service';
import { GameService } from 'src/app/core/services/game/game.service';
import { GameMode } from 'src/app/core/model/gamemode.model';
import { StarshipJudgeService } from './services/judge/impl/starship/starship-judge.service';
import { PeopleJudgeService } from './services/judge/impl/people/people-judge.service';
import { RoundCounterComponent } from './components/round-counter/round-counter.component';
import { MatCardModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameScoreComponent } from './components/game-score/game-score.component';
import { MatButtonModule } from "@angular/material/button";
import { BattleResultComponent } from './components/battle-result/battle-result.component';
import { BattleService } from "./services/battle/battle.service";

const MATERIAL_COMPONENTS = [
  MatCardModule,
  MatButtonModule
];

const COMPONENTS = [
  BattleComponent,
  RoundCounterComponent,
  GameScoreComponent,
  BattleResultComponent
];


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    BattleRoutingModule,
    SharedModule,

    ...MATERIAL_COMPONENTS
  ],
  providers: [
    {
      provide: JudgeService,
      useFactory: (game: GameService) => {
        if (game.gameMode === GameMode.HUMAN) {
          return new PeopleJudgeService();
        } else if (game.gameMode === GameMode.STARSHIP) {
          return new StarshipJudgeService();
        }
      },
      deps: [GameService]
    },
    BattleService
  ]
})
export class BattleModule {
}
