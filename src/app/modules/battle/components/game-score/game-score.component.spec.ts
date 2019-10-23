import { GameScoreComponent } from './game-score.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MatCardModule } from '@angular/material/card';

describe('GameScoreComponent', () => {
  let spectator: SpectatorHost<GameScoreComponent>;
  const createHost = createHostFactory({
    component: GameScoreComponent,
    imports: [MatCardModule]
  });

  beforeEach(() => {
    spectator = createHost('<swars-game-score [scores]="scores"></swars-game-score>', {
      hostProps: {
        scores: [0, 0]
      }
    });
  });

  it('shoud display table of numbers as players scores', () => {
    spectator.setHostInput({
      scores: [12, 24]
    });

    let renderedScores = spectator.queryAll('.swars-game-score__player-score')
      .map(elem => elem.textContent)
      .map(text => Number(text));
    expect(renderedScores).toEqual([12, 24]);

    spectator.setHostInput({
      scores: [24, 25]
    });

    renderedScores = spectator.queryAll('.swars-game-score__player-score')
      .map(elem => elem.textContent)
      .map(text => Number(text));
    expect(renderedScores).toEqual([24, 25]);
  });
});
