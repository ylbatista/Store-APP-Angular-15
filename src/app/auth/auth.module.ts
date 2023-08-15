import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';

import { AuthRoutingModule } from './auth-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],

  imports: [

    CommonModule,
    RouterModule,

    ///material
    MaterialModule,

    AuthRoutingModule,
  ],

})
export class AuthModule { }
