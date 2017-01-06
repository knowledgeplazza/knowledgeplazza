import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BattleComponent } from './battle.component';

const battlesRoutes: Routes = [
  {
    path: '',
    component: BattleComponent,
    // canActivate: [CanActivatePlazza],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(battlesRoutes);
