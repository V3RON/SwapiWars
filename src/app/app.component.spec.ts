import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { LoadingIndicatorComponent } from './shared/components/loading-indicator/loading-indicator.component';

describe('AppComponent', () => {
  let spectator: Spectator<LoadingIndicatorComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [RouterTestingModule]
  });

  beforeEach(() => spectator = createComponent());

  it('should create the app', () => {
    expect(spectator).toBeTruthy();
  });
});
