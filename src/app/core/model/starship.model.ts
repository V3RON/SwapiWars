import { Entity } from './entity.model';
import { StarshipSchema } from '../services/swapi/swapi.schema';
import { BattleStat } from './battle-stat.model';

export class Starship implements Entity {
  private readonly _name: string;
  private readonly _crew: number;
  private readonly _passengers: number;
  private readonly _costInCredits: number;

  get name(): string {
    return this._name;
  }

  get crew(): number {
    return this._crew;
  }

  get passengers(): number {
    return this._passengers;
  }

  get costInCredits(): number {
    return this._costInCredits;
  }

  // TODO: GENERALIZE!
  get stats(): BattleStat[] {
    return [
      {
        name: 'crew',
        value: this._crew
      },
      {
        name: 'passengers',
        value: this._passengers
      },
      {
        name: 'costInCredits',
        value: this._costInCredits
      }
    ];
  }

  constructor(starshipSchema: StarshipSchema) {
    this._name = starshipSchema.name;
    this._crew = parseInt(starshipSchema.crew, 10) || 0;
    this._passengers = parseInt(starshipSchema.passengers, 10) || 0;
    this._costInCredits = parseInt(starshipSchema.cost_in_credits, 10) || 0;
  }
}
