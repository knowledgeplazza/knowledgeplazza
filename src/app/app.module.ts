import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

import { ServerModule } from './server/server.module';
import { QuestionModule } from './question/question.module';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),

    ServerModule,
    QuestionModule,
    routing
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
