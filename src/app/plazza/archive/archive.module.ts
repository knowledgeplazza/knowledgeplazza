import { NgModule } from '@angular/core';
import { SharedModule } from '^shared/shared.module';

import { ArchiveComponent } from './archive.component';
import { ArchiveItemsComponent } from './archive-items.component';
import { StatsComponent } from './stats/stats.component';

import { ArchiveService } from './archive.service';
import { StatsService } from './stats/stats.service';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [ArchiveComponent],
  declarations: [ArchiveComponent, ArchiveItemsComponent, StatsComponent],
  providers: [ArchiveService, StatsService]
})
export class ArchiveModule { }
