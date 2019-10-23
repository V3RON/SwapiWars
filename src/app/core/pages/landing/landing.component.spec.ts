import { LandingComponent } from './landing.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { GameService } from '../../services/game/game.service';
import { GameMode } from '../../model/gamemode.model';

describe('LandingComponent', () => {
  let spectator: Spectator<LandingComponent>;
  const createComponent = createComponentFactory({
    component: LandingComponent,
    imports: [ReactiveFormsModule, SharedModule],
    mocks: [Router, GameService]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set the disabled state to true by default', () => {
    expect(spectator.query('button[type=submit]')).toBeDisabled();
  });

  it('should set the disabled state to false when gamemode is selected', () => {
    spectator.component.startingForm.get('mode').setValue(GameMode.HUMAN);
    spectator.fixture.detectChanges();
    expect(spectator.query('button[type=submit]')).not.toBeDisabled();
  });

  it('should run the game and replace to battle screen after submit', () => {
    const gameService = spectator.get(GameService);
    const router = spectator.get(Router);

    spectator.component.startingForm.get('mode').setValue(GameMode.HUMAN);
    spectator.fixture.detectChanges();
    spectator.click(spectator.query('button[type=submit]'));

    expect(gameService.runGame).toHaveBeenCalledWith(GameMode.HUMAN);
    expect(router.navigate).toHaveBeenCalledWith(['/battle'], {replaceUrl: true});
  });
});
