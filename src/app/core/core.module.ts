import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './pages/landing/landing.component';
import { MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

const MATERIAL_MODULES = [
  MatButtonModule
];

const PAGES = [
  LandingComponent
];

@NgModule({
  declarations: [
    ...PAGES
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,

    ...MATERIAL_MODULES
  ],
  exports: [
    ...PAGES
  ]
})
export class CoreModule {
}
