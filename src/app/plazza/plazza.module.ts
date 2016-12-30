import { NgModule } from '@angular/core';

import { SharedModule } from '^shared/shared.module';
import { QuestionModule } from '^question/question.module';
import { ArchiveModule } from './archive/archive.module';
import { GroupsModule } from './groups/groups.module';

import { PlazzaComponent } from './plazza.component';
import { PlazzaHeaderComponent } from './plazza-header/plazza-header.component';
import { GreetingComponent } from './greeting/greeting.component';

import { GreetingService } from './greeting/greeting.service';

import { routing } from './plazza.routing';

@NgModule({
  imports: [
    SharedModule,

    QuestionModule,
    ArchiveModule,
    GroupsModule,

    routing
  ],
  declarations: [PlazzaComponent, GreetingComponent, PlazzaHeaderComponent],
  providers: [
    GreetingService
  ]
})
export class PlazzaModule { }
