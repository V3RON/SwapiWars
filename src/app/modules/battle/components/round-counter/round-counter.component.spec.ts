import { RoundCounterComponent } from './round-counter.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MatCardModule } from '@angular/material/card';

describe('RoundCounterComponent', () => {
  let spectator: SpectatorHost<RoundCounterComponent>;
  const createHost = createHostFactory({
    component: RoundCounterComponent,
    imports: [MatCardModule]
  });

  beforeEach(() => spectator = createHost('<swars-round-counter [round]="round"></swars-round-counter>'));

  it('should render waiting message when round is less or equal 0 or undefined', () => {
    const message = spectator.debugElement.nativeElement.textContent;
    expect(message.includes('Starting')).toBe(true);
  });

  it('should render round number', () => {
    spectator.setHostInput({
      round: 12
    });

    const message = spectator.debugElement.nativeElement.textContent;
    expect(message.includes('12')).toBe(true);
  });
});
