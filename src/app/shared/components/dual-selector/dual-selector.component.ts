import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DualSelectorItem {
  icon: string;
  name: string;
  value: unknown;
}

@Component({
  selector: 'swars-dual-selector',
  templateUrl: './dual-selector.component.html',
  styleUrls: ['./dual-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DualSelectorComponent,
    multi: true
  }]
})
export class DualSelectorComponent implements ControlValueAccessor {
  @Input()
  title: string;

  @Input()
  options: DualSelectorItem[];

  selectedIndex: number;
  onChange: (value: unknown) => {};
  onTouched: () => {};
  disabled: boolean;

  constructor(
    private changeDetRef: ChangeDetectorRef
  ) {
  }

  selectItem(index: number): void {
    if (!this.disabled) {
      this.selectedIndex = index;
      this.onTouched();
      this.onChange(this.options[this.selectedIndex].value);
      this.changeDetRef.markForCheck();
    }
  }

  writeValue(selected: number): void {
    this.selectedIndex = selected;
    this.changeDetRef.markForCheck();
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.changeDetRef.markForCheck();
  }
}
