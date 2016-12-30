import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '^shared/shared.module';

import { GroupsService } from './groups.service';
import { BattlesService } from './battles/battles.service';

import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupsListComponent } from './group-list/group-list.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([])
  ],
  exports: [],
  declarations: [GroupDetailComponent, GroupsListComponent],
  providers: [GroupsService, BattlesService]
})
export class GroupsModule { }
