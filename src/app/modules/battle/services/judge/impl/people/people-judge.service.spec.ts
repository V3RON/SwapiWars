import { TestBed } from '@angular/core/testing';

import { PeopleJudgeService } from './people-judge.service';

describe('PeopleJudgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeopleJudgeService = TestBed.get(PeopleJudgeService);
    expect(service).toBeTruthy();
  });
});
