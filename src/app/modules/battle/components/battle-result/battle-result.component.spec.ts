import { BattleResultComponent } from './battle-result.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MatCardModule } from '@angular/material/card';

describe('BattleResultComponent', () => {
  let spectator: SpectatorHost<BattleResultComponent>;
  const createHost = createHostFactory({
    component: BattleResultComponent,
    imports: [MatCardModule]
  });

  beforeEach(() => {
    spectator = createHost('<swars-battle-result [player]="player">', {
      hostProps: {
        player: null
      }
    });
  });

  it('should display winning info when player is given', () => {
    spectator.setHostInput({
      player: 1
    });

    let text = spectator.debugElement.nativeElement.textContent;
    expect(text).toBeTruthy(text.includes('Player 2'));

    spectator.setHostInput({
      player: 0
    });

    text = spectator.debugElement.nativeElement.textContent;
    expect(text).toBeTruthy(text.includes('Player 1'));
  });

  it('should display a tie when player is unknown', () => {
    spectator.setHostInput({
      player: -1
    });

    const text = spectator.debugElement.nativeElement.textContent;
    expect(text).toBeTruthy(text.includes('tie'));
  });
});
