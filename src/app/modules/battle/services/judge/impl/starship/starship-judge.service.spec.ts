import { TestBed } from '@angular/core/testing';

import { StarshipJudgeService } from './starship-judge.service';

describe('StarshipJudgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StarshipJudgeService = TestBed.get(StarshipJudgeService);
    expect(service).toBeTruthy();
  });
});
