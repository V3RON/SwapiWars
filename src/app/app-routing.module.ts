import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './core/pages/landing/landing.component';
import { BattleGuard } from './core/guards/battle.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent
  },
  {
    path: 'battle',
    loadChildren: () => import('./modules/battle/battle.module').then(m => m.BattleModule),
    canLoad: [BattleGuard],
    canActivate: [BattleGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
