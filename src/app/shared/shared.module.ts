import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdSnackBar, MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { UserSearchComponent } from './user-search/user-search.component';
import { AssetDirective } from './asset.directive';
import { AsyncPipe } from './async.pipe';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        UserSearchComponent,
        AssetDirective,
        AsyncPipe
    ],
    declarations: [UserSearchComponent, AssetDirective, AsyncPipe],
    providers: [MdSnackBar],
})
export class SharedModule { }
