import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BattleComponent } from './battle.component';

const battlesRoutes: Routes = [
  {
    path: '',
    component: BattleComponent,
    // canActivate: [CanActivatePlazza],
    // children: [
    //   {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'questions',
    //   },
    //   {
    //     path: 'questions',
    //     component: QuestionBrowserComponent,
    //   },
    //   {
    //     path: 'question/:id',
    //     component: QuestionAskerComponent,
    //   },
    //   {
    //     path: 'archive',
    //     component: ArchiveComponent,
    //   },
    //   {
    //     path: 'groups',
    //     component: GroupsListComponent,
    //   },
    //   {
    //     path: 'group/:id',
    //     component: GroupDetailComponent,
    //   },
    // ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(battlesRoutes);
