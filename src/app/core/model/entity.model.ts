import { BattleStat } from './battle-stat.model';

export enum EntityTypes {
  HUMAN = 'HUMAN', STARSHIP = 'STARSHIP'
}

export interface Entity {
  name: string;
  stats: BattleStat[];
}
