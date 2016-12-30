import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '^shared/shared.module';

import { routing } from './login.routing';

import { LoginComponent }   from './login.component';
import { SignUpComponent }   from './sign-up/sign-up.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    routing
  ],
  exports: [],
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  providers: [],
})
export class LoginModule { }
