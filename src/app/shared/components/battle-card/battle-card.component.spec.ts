import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleCardComponent } from './battle-card.component';

describe('BattleCardComponent', () => {
  let component: BattleCardComponent;
  let fixture: ComponentFixture<BattleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BattleCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
