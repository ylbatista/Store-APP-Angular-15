import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { AdminOnlyDirective } from '../directives/admin-only.directive';
import { IsLoggedDirective } from '../directives/isLogged.directive';


@NgModule({
  declarations: [

    AdminOnlyDirective,
    IsLoggedDirective,
  ],

  imports: [
    CommonModule,
    MaterialModule,
  ],

  exports: [

    AdminOnlyDirective,
    IsLoggedDirective,

  ]

})
export class SharedModule { }
