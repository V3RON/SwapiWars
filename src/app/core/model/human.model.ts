import { Entity } from './entity.model';
import { HumanSchema } from '../services/swapi/swapi.schema';
import { BattleStat } from './battle-stat.model';

export class Human implements Entity {
  private readonly _name: string;
  private readonly _height: number;
  private readonly _mass: number;
  private readonly _gender: string;

  get name(): string {
    return this._name;
  }

  get height(): number {
    return this._height;
  }

  get mass(): number {
    return this._mass;
  }

  get gender(): string {
    return this._gender;
  }

  get stats(): BattleStat[] {
    return [
      {
        name: 'height',
        value: this._height
      },
      {
        name: 'mass',
        value: this._mass
      },
      {
        name: 'gender',
        value: this._gender
      }
    ];
  }

  constructor(humanSchema: HumanSchema) {
    this._name = humanSchema.name;
    this._height = parseInt(humanSchema.height, 10) || 0;
    this._mass = parseInt(humanSchema.mass, 10) || 0;
    this._gender = humanSchema.gender;
  }
}
