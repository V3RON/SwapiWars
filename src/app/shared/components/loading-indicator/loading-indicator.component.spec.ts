import { LoadingIndicatorComponent } from './loading-indicator.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('LoadingIndicatorComponent', () => {
  let spectator: Spectator<LoadingIndicatorComponent>;
  const createComponent = createComponentFactory({
    component: LoadingIndicatorComponent,
    imports: [MatCardModule, MatProgressSpinnerModule]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
