import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminRoutingModule } from '../admin-routing.module';

//USERS MODULE
import { UsersComponent } from './users.component';

import { MaterialModule } from 'src/app/shared/material.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

@NgModule({
  declarations: [
    UsersComponent,

    UsersListComponent,
    UsersEditComponent,

  ],

  imports: [
    CommonModule,
    RouterModule,

    //MATERIAL
    MaterialModule,
    MatTooltipModule,
    AdminRoutingModule
  ],
})
export class UsersModule { }
