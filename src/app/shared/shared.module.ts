import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatGridListModule, MatIconModule } from '@angular/material';

import { DualSelectorComponent } from './components/dual-selector/dual-selector.component';
import { BattleCardComponent } from './components/battle-card/battle-card.component';
import { UndasherPipe } from './pipes/undasher/undasher.pipe';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

const MATERIAL_MODULES = [
  MatCardModule,
  MatIconModule,
  MatGridListModule,
  MatButtonModule,
  MatProgressSpinnerModule
];

const COMPONENTS = [
  DualSelectorComponent,
  BattleCardComponent,
  LoadingIndicatorComponent
];

const PIPES = [
  UndasherPipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES
  ]
})
export class SharedModule {
}
