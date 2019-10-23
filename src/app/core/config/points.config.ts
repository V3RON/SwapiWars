import { GameMode } from '../model/gamemode.model';

export const MODIFICATORS_CONFIG = {
  [GameMode.HUMAN]: {
    height: 2,
    mass: 1
  },
  [GameMode.STARSHIP]: {
    crew: 2,
    passengers: 1,
    costInCredits: 4
  }
};
