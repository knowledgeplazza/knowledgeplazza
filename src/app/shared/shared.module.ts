import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdSnackBar } from '@angular/material';

import { AssetDirective } from './asset.directive';
import { AsyncPipe } from './async.pipe';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule,
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        UserSearchComponent,
        LeaderboardComponent,
        AssetDirective,
        AsyncPipe,
    ],
    declarations: [UserSearchComponent, AssetDirective, AsyncPipe, LeaderboardComponent],
    providers: [MdSnackBar],
})
export class SharedModule { }
