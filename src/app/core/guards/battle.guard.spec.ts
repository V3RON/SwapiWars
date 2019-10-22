import { inject, TestBed } from '@angular/core/testing';

import { BattleGuard } from './battle.guard';

describe('BattleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BattleGuard]
    });
  });

  it('should ...', inject([BattleGuard], (guard: BattleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
