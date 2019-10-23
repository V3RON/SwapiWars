import { DualSelectorComponent } from './dual-selector.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MatCardModule } from '@angular/material/card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

describe('DualSelectorComponent', () => {
  let spectator: SpectatorHost<DualSelectorComponent>;
  const createHost = createHostFactory({
    component: DualSelectorComponent,
    imports: [MatCardModule, MatIconModule, ReactiveFormsModule]
  });
  let control;

  beforeEach(() => {
    control = new FormControl();
    spectator = createHost('<swars-dual-selector [formControl]="control" [options]="options"></swars-dual-selector>', {
      hostProps: {
        control,
        options: []
      }
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should process disable/enable methods', () => {
    control.disable();
    expect(spectator.component.disabled).toBe(true);

    control.enable();
    expect(spectator.component.disabled).toBe(false);
  });

  it('should change the value', () => {
    spectator.setHostInput({
      control,
      options: [
        {
          icon: 'gear',
          name: 'Test#1',
          value: 'yes'
        },
        {
          icon: 'gear',
          name: 'Test#2',
          value: 'no'
        }
      ]
    });

    control.setValue('yes');
    expect(spectator.component.selectedIndex).toBe(0);
  });
});
