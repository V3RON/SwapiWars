import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../services/game/game.service';
import { GameMode } from '../../model/gamemode.model';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent {
  startingForm: FormGroup = new FormGroup({
    mode: new FormControl(null, Validators.required),
    // players: new FormControl(null, Validators.required)
  });

  options = [
    {
      name: 'Human',
      icon: 'directions_run',
      value: GameMode.HUMAN
    },
    {
      name: 'Starship',
      icon: 'directions_boat',
      value: GameMode.STARSHIP
    }
  ];

  /*
  optionsPlayers = [
    {
      name: '1 vs CPU',
      icon: 'computer',
      value: Players.ONE
    },
    {
      name: '1 vs 1',
      icon: 'people',
      value: Players.TWO
    }
  ];
   */

  constructor(
    private router: Router,
    private game: GameService
  ) {
  }

  onStart(): void {
    const gameMode: GameMode = this.startingForm.get('mode').value;

    this.game.runGame(gameMode);
    this.router.navigate(['/battle'], {replaceUrl: true});
  }
}
